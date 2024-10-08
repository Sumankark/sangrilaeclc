import axios from "axios";

export let hitApi = axios.create({
  baseURL: "http://localhost:8080",
});
