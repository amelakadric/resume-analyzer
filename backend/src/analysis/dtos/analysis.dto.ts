import { IsString } from 'class-validator';

export class AnalysisDto {
  @IsString()
  jobDescription: string;
}
