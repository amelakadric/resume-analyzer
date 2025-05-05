import { Injectable } from '@nestjs/common';
import { AnalysisDto } from '../dtos/analysis.dto';
import { AnalysisRepository } from 'src/shared/database/repositories/analysis.repository';
import { Analysis } from 'src/shared/database/schemas/analysis.schema';

@Injectable()
export class AnalysisService {
  constructor(private analysisRepository: AnalysisRepository) {}

  async createAnalysis(analysisDto: AnalysisDto): Promise<Analysis> {
    //api za analizu
    return this.analysisRepository.create(analysisDto);
  }
}
