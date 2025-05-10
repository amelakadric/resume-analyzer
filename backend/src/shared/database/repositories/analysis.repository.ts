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

  async create(
    analysisDto: AnalysisDto,
    resumeSummary: string,
    matchPercentage: number,
  ): Promise<Analysis> {
    return await this.analysisModel.create({
      jobDescription: analysisDto.jobDescription,
      resume: resumeSummary,
      matchPercentage: matchPercentage,
    });
  }
  catch(error) {
    throw new InternalServerErrorException();
  }
}
