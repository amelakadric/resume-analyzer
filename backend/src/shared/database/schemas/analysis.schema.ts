import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Analysis extends Document {
  @Prop({ required: true })
  jobDescription: string;

  @Prop({ required: true })
  resume: string;

  @Prop({ required: true })
  matchPercentage: number;
}

export const AnalysisSchema = SchemaFactory.createForClass(Analysis);
