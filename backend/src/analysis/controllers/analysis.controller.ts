import { Body, Controller, Post } from '@nestjs/common';
import { AnalysisDto } from '../dtos/analysis.dto';
import { AnalysisService } from '../services/analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private analysisService: AnalysisService) {}

  @Post()
  async create(@Body() analysisDto: AnalysisDto) {
    return this.analysisService.createAnalysis(analysisDto);
  }
}
