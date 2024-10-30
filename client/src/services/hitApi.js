import axios from "axios";

export const hitApi = axios.create({
  // baseURL: "https://sangrilaeclc.onrender.com",
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
