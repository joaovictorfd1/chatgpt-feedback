import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/"

export const api = axios.create({
  // baseURL: process.env.REACT_APP_API,
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
