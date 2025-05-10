import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnalysisDto } from '../dtos/analysis.dto';
import { AnalysisService } from '../services/analysis.service';
import { AnalysisResponse } from '../interfaces/analysis-response.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('analysis')
export class AnalysisController {
  constructor(private analysisService: AnalysisService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('resume', {
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(doc|docx|pdf)$/)) {
          return callback(
            new BadRequestException(
              'Only doc, docx and pdf files are allowed!',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Body() analysisDto: AnalysisDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AnalysisResponse | null> {
    return this.analysisService.createAnalysis(analysisDto, file);
  }
}
