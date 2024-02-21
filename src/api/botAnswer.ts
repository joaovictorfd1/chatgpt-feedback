import { IBotAnwser, IProject } from "@/interfaces/IQuestion";
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

export const getProjectByName = async (project_name: string) => {
  try {
    const response = await api.get<IProject[]>(`${path}/projects/${project_name}`);
    return response.data;
  } catch (error) {
    throw new Error("Requisição invalida");
  }
};

export const getAllProject = async () => {
  try {
    const response = await api.get<IProject[]>(`${path}/projects/`);
    return response.data;
  } catch (error) {
    throw new Error("Requisição invalida");
  }
};