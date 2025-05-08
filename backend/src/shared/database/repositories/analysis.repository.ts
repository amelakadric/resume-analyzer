import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { Analysis } from '../schemas/analysis.schema';
import { AnalysisDto } from 'src/analysis/dtos/analysis.dto';

@Injectable()
export class AnalysisRepository {
  constructor(
    @InjectModel(Analysis.name) private readonly analysisModel: Model<Analysis>,
  ) {}

  async create(analysisDto: AnalysisDto): Promise<Analysis> {
    try {
      const analysis = new this.analysisModel({
        jobDescription: analysisDto.jobDescription,
        resume: new Types.ObjectId(analysisDto.resumeId),
      });

      const savedAnalysis = await analysis.save();
      return await savedAnalysis.populate('resume');
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
