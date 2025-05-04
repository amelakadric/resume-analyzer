import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Resume } from './resume.schema';

@Schema({ timestamps: true })
export class Analysis extends Document {
  @Prop({ required: true })
  jobDescription: string;

  @Prop({ type: Types.ObjectId, ref: 'Resume', required: true })
  resume: Resume;
}

export const AnalysisSchema = SchemaFactory.createForClass(Analysis);
