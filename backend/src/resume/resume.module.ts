import { Module } from '@nestjs/common';
import { ResumeService } from './services/resume.service';
import { ResumeController } from './controllers/resume.controller';
import { ResumeRepository } from 'src/shared/database/schemas/resume.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Resume,
  ResumeSchema,
} from 'src/shared/database/repositories/resume.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
  ],
  providers: [ResumeService, ResumeRepository],
  controllers: [ResumeController],
})
export class ResumeModule {}
