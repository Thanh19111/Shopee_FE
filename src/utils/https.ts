import axios, {type AxiosError, type AxiosInstance} from "axios";
import HttpStatusCode from "../constants/httpStatusCode.enum.ts";
import {toast} from "react-toastify";
import type {AuthResponse} from "../types/auth.type.ts";
import {clearLS, getAccessTokenFromLS, saveAccessTokenToLS, setProfileToLS} from "./auth.ts";
import path from "../constants/paths.ts";

class Https {
  public instance: AxiosInstance;
  private accessToken: string;

  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if(this.accessToken && config.headers) {
          config.headers.setAuthorization(this.accessToken);
          return config;
        }
      return config;
    },
      (error: AxiosError) => {
        return Promise.reject(error);
      })

    this.instance.interceptors.response.use(
      (response) => {
        const {url} = response.config;
        if(url === path.login || url === path.register){
          const data = response.data as AuthResponse;
          this.accessToken = data.data.access_token;
          saveAccessTokenToLS(this.accessToken);
          setProfileToLS(data.data.user)
        } else if(url === path.logout){
          this.accessToken = '';
          clearLS();
        }
        return response;
      },

      function (error: AxiosError) {
        if(error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data:any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
        }
        if(error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS();
          // window.location.reload();
        }
        return Promise.reject(error);
      }
    )
  }
}

const http = new Https().instance;
export default http;