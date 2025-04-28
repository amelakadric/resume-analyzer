import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resume } from '../repositories/resume.schema';
import { Model } from 'mongoose';

@Injectable()
export class ResumeRepository {
  constructor(
    @InjectModel(Resume.name) private readonly resumeModel: Model<Resume>,
  ) {}

  async create(file: Express.Multer.File): Promise<Resume> {
    try {
      return await this.resumeModel.create({ fileName: file.filename });
    } catch (error) {
      throw new BadRequestException('Duplicate filename');
    }
  }
}
