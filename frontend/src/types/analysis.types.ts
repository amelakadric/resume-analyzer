export interface AnalysisRequest {
  resume: File;
  jobDescription: string;
}

export type AnalysisResponse = {
  summary: {
    title: string;
    content: string;
  };
  matchPercentage: number;
  matchingSkills: {
    title: string;
    items: string[];
  };
  gaps: {
    title: string;
    items: string[];
  };
  improvements: {
    title: string;
    items: string[];
  };
};

export const createAnalysisFormData = (data: AnalysisRequest): FormData => {
  const formData = new FormData();
  formData.append("resume", data.resume);
  formData.append("jobDescription", data.jobDescription);
  return formData;
};
