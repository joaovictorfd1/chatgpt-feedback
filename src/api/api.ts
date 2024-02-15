import axios from "axios";

const apiUrl = "http://docgptfeedback.bot.nu/"

export const api = axios.create({
  // baseURL: process.env.REACT_APP_API,
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
