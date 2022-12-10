import axios from "axios";
import Cookies from "universal-cookie";
import { TOKEN_KEY } from "./constants";


export default class ApiProvider {
  api;
  constructor(config) {
    this.api = axios.create(config);
    this.api.interceptors.request.use(async (req) => {
      const cookies = new Cookies(req.headers.cookies);
        return {
          ...req,
          headers: {
            ...req.headers,
            Authorization: `Bearer ${cookies.get(TOKEN_KEY)}`,
          },
        }; 
    });
    this.api.interceptors.response.use(
      (res) => {
        if (res.data === "") {
          return { ...res, data: null };
        }
        return res;
      }
    );
  }
  async request(config){
    const response = await this.api.request(config);
    return response?.data;
  }
}
