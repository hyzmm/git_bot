import axios from "axios";
import { fetchAccessToken } from "./FetchAccessToken.js";

const feiShuAxios = axios.create({
  baseURL: "https://open.feishu.cn/open-apis",
});
feiShuAxios.interceptors.request.use((config) => {
  console.log("request: ", config.url);
  return config;
});
feiShuAxios.interceptors.response.use(undefined, async (error) => {
  const EC_NEED_TOKEN = 99991661;
  const EC_TOKEN_INVALID = 99991663;

  const { response, config } = error;
  if (response.status === 400) {
    if (
      response.data.code === EC_NEED_TOKEN ||
      response.data.code === EC_TOKEN_INVALID
    ) {
      try {
        const token = await fetchAccessToken();
        // @ts-ignore
        feiShuAxios.defaults.headers[
          "Authorization"
        ] = `Bearer ${token.tenant_access_token}`;
        return Promise.resolve(feiShuAxios(config));
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
  return Promise.reject(error);
});

export default feiShuAxios;
