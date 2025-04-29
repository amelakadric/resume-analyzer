import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Resume extends Document {
  @Prop({ required: true, unique: true })
  fileName: string;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
