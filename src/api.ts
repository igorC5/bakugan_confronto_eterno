import axios from "axios";

export const api = axios.create({
  baseURL: "https://server-bakugan.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});