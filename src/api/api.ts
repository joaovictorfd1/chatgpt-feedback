import axios from "axios";

const apiUrl = "http://localhost:3001/"
console.log(apiUrl)

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
