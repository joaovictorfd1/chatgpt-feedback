import { IFeedback } from "@/interfaces/IQuestion";
import { api } from "./api";


const path = "/feedback_questions";

export const getFeedbackAll = async () => {
  const response = await api.get<IFeedback[]>(path);
  return response.data;
};

export const getFeedbackById = async (id: string) => {
  try {
    const response = await api.get<IFeedback>(`${path}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Requisição invalida");
  }
};

export const createFeedback = async (body: IFeedback) => {
  try {
    const response = await api.post(`${path}/`, body);
    return response
  } catch(error) {
    throw new Error("Requisição invalida");
  }
}

export const updateFeedback = async (body: IFeedback, id: string) => {
  try {
    const response = await api.put(`${path}/${id}`, body);
    return response
  } catch(error) {
    throw new Error("Requisição invalida");
  }
}