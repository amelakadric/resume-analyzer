import { Injectable } from '@nestjs/common';
import { AnalysisDto } from '../dtos/analysis.dto';
import { AnalysisRepository } from 'src/shared/database/repositories/analysis.repository';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as pdfParse from 'pdf-parse';
import { AnalysisResponse } from '../interfaces/analysis-response.interface';

@Injectable()
export class AnalysisService {
  openai: OpenAI;

  constructor(private analysisRepository: AnalysisRepository) {
    this.openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
  }

  async createAnalysis(
    analysisDto: AnalysisDto,
  ): Promise<AnalysisResponse | null> {
    const analysis = await this.analysisRepository.create(analysisDto);

    const jobDescriptionSummary = await this.summarizeJobDescription(
      analysisDto.jobDescription,
    );

    const resumeSummary = await this.summarizeResume(analysis.resume.fileName);

    if (!jobDescriptionSummary || !resumeSummary) {
      return null;
    }

    const prompt = `
      I have a resume in the form of a text summary and a job description text summary.
      Analyze the resume and compare it to the job description. Address the response to the candidate using 'You' or 'Your'.
      Return the analysis in the following JSON format:
      {
        "summary": {
          "title": "Overall Assessment",
          "content": "A brief 2-3 sentence summary of how well the candidate matches the position"
        },
        "matchPercentage": 85,
        "matchingSkills": {
          "title": "Matching Skills and Qualifications",
          "items": ["skill 1", "skill 2", ...]
        },
        "gaps": {
          "title": "Gaps",
          "items": ["gap 1", "gap 2", ...]
        },
        "improvements": {
          "title": "Improvements",
          "items": ["improvement 1", "improvement 2", ...]
        }
      }

      Calculate the matchPercentage based on:
      - Required skills match (40%)
      - Experience level match (30%)
      - Education match (20%)
      - Additional qualifications match (10%)

      Job Description:
      ${jobDescriptionSummary}

      Resume:
      ${resumeSummary}
    `;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional career advisor and resume analyzer. Always respond in valid JSON format.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      return null;
    }

    try {
      return JSON.parse(content) as AnalysisResponse;
    } catch (error) {
      console.error('Failed to parse analysis response:', error);
      return null;
    }
  }

  async summarizeResume(fileName: string): Promise<string | null> {
    const resumePath = path.join(process.cwd(), 'uploads', 'resumes', fileName);
    const fileBuffer = fs.readFileSync(resumePath);
    try {
      const pdfData = await pdfParse(fileBuffer);
      const resumeText = pdfData.text;

      const prompt = `Summarize the following resume:\n\n${resumeText}`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume summarizer.',
          },
          { role: 'user', content: prompt },
        ],
      });

      return completion.choices[0].message.content;
    } catch (error) {
      throw new Error(`Failed to parse PDF: ${error.message}`);
    }
  }

  async summarizeJobDescription(
    jobDescription: string,
  ): Promise<string | null> {
    const prompt = `Summarize the following job description:\n\n${jobDescription}`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional job description summarizer.',
        },
        { role: 'user', content: prompt },
      ],
    });
    return completion.choices[0].message.content;
  }
}
