import axios from "axios";
import { conf } from "../utils/constant.js";

export const axiosInstance = axios.create({
  baseURL: conf.BACKEND_API_BASE_URL,
  withCredentials: true,
});
