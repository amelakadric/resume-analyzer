export type AnalysisRequest = {
  resumeId: string;
  jobDescription: string;
};

export type AnalysisResponse = {
  _id: string;
  jobDescription: string;
  resume: string;
  createdAt: string;
  updatedAt: string;
};
