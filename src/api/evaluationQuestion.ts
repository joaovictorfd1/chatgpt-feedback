import { IBotAnwser, IEvoluationQuestion } from "@/interfaces/IQuestion";
import { api } from "./api";


const path = "/evaluations";

export const getEvaluationAll = async () => {
  const response = await api.get<IBotAnwser[]>(path);
  return response.data;
};

export const getEvaluationById = async (id: string) => {
  try {
    const response = await api.get<IBotAnwser>(`${path}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Requisição invalida");
  }
};

export const createEvoluation = async (body: IEvoluationQuestion) => {
  try {
    const response = await api.post(`${path}`, body);
    return response
  } catch(error) {
    throw new Error("Requisição invalida");
  }

}