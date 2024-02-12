import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/"
console.log(apiUrl)

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
