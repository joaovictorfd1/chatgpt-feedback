import { IQuestion } from "@/interfaces/IQuestion";
import { api } from "./api";


const path = "/question";

export const getQuestions = async () => {
  const response = await api.get<IQuestion[]>(path);
  return response.data;
};

export const getQuestionByid = async (id: string) => {
  try {
    const response = await api.get<IQuestion>(`${path}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Requisição invalida");
  }
};

export const addProduct = async (product: IQuestion[]) => {
  const response = await api.post(path, product);

  return response.data[0];
};
