import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeModule } from './resume/resume.module';
import { AnalysisModule } from './analysis/analysis.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';

@Module({
  imports: [
    ResumeModule,
    AnalysisModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(env.MONGODB_URI!),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
