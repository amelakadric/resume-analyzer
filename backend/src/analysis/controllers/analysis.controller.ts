import { Body, Controller, Post } from '@nestjs/common';
import { AnalysisDto } from '../dtos/analysis.dto';
import { AnalysisService } from '../services/analysis.service';
import { AnalysisResponse } from '../interfaces/analysis-response.interface';

@Controller('analysis')
export class AnalysisController {
  constructor(private analysisService: AnalysisService) {}

  @Post()
  async create(
    @Body() analysisDto: AnalysisDto,
  ): Promise<AnalysisResponse | null> {
    return this.analysisService.createAnalysis(analysisDto);
  }
}
