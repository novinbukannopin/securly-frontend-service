import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {BACKEND_URL} from "@/lib/env";
import Cookies from "js-cookie";

export const token = Cookies.get("token")

const createAxiosInstance = (config: AxiosRequestConfig): AxiosInstance => {
  return axios.create(config);
};

export const client = createAxiosInstance({
  baseURL: BACKEND_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

