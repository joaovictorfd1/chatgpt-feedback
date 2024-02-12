import { IBotAnwser } from "@/interfaces/IQuestion";
import { api } from "./api";


const path = "/bot_answer";

export const getQuestions = async () => {
  const response = await api.get<IBotAnwser[]>(path);
  return response.data;
};

export const getQuestionByid = async (id: string) => {
  try {
    const response = await api.get<IBotAnwser>(`${path}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Requisição invalida");
  }
};