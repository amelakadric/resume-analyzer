import { AnalysisRequest } from "../types/analysis.types";
import { httpService } from "./httpService";

export const postAnalysis = async (data: AnalysisRequest) => {
  const response = await httpService.post(`analysis`, data, {});

  return response.data;
};
