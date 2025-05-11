import { httpService } from "./httpService";

export const getHealth = async () => {
  try {
    const response = await httpService.get(`health`);
    console.log("Server pinged successfully");
    return response.data;
  } catch (error) {
    console.error("Failed to ping server:", error);
  }
};
