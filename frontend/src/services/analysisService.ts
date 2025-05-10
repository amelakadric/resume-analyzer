import { httpService } from "./httpService";
import {
  AnalysisRequest,
  createAnalysisFormData,
} from "../types/analysis.types";

export const postAnalysis = async (data: AnalysisRequest) => {
  const formData = createAnalysisFormData(data);
  const response = await httpService.post(`analysis`, formData, {});
  return response.data;
};
