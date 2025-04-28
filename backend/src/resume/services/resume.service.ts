import { Injectable } from '@nestjs/common';
import { Resume } from 'src/shared/database/repositories/resume.schema';
import { ResumeRepository } from 'src/shared/database/schemas/resume.repository';

@Injectable()
export class ResumeService {
  constructor(private resumeRepository: ResumeRepository) {}

  async create(file: Express.Multer.File): Promise<Resume> {
    return this.resumeRepository.create(file);
  }
}
