import { httpService } from "./httpService";

export const postResume = async (data: FormData) => {
  const response = await httpService.post(`resume`, data, {});

  return response.data;
};
