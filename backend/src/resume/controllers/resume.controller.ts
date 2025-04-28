import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ResumeService } from '../services/resume.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Resume } from 'src/shared/database/repositories/resume.schema';

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/resumes',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `resume-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
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
  async create(@UploadedFile() file: Express.Multer.File): Promise<Resume> {
    return this.resumeService.create(file);
  }
}
