import { Module } from '@nestjs/common';
import { AnalysisService } from './services/analysis.service';
import { AnalysisController } from './controllers/analysis.controller';

@Module({
  providers: [AnalysisService],
  controllers: [AnalysisController],
})
export class AnalysisModule {}
