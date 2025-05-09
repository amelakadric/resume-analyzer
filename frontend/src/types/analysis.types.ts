export type AnalysisRequest = {
  resumeId: string;
  jobDescription: string;
};

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
