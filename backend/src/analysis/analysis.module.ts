import { Module } from '@nestjs/common';
import { AnalysisService } from './services/analysis.service';
import { AnalysisController } from './controllers/analysis.controller';
import { AnalysisRepository } from 'src/shared/database/repositories/analysis.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Analysis,
  AnalysisSchema,
} from 'src/shared/database/schemas/analysis.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Analysis.name, schema: AnalysisSchema },
    ]),
  ],
  providers: [AnalysisService, AnalysisRepository],
  controllers: [AnalysisController],
})
export class AnalysisModule {}
