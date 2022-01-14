import axios from "axios";
import feiShuAxios from "../feishu_api/Axios.js";

const gitlabAxios = axios.create({
  baseURL: "http://git.ids111.com/api/v4",
});
gitlabAxios.defaults.headers["PRIVATE-TOKEN"] = "sPH4YKs6jxCkARBYsJ8Y";
gitlabAxios.interceptors.request.use((config) => {
  console.log("request: ", config.url);
  return config;
});

export async function getGitLabUserInfo(id) {
  const result = await gitlabAxios.get(`/users/${id}`);
  return result.data;
}

export async function getFileContent(projectId, file, ref) {
  const result = await gitlabAxios.get(
    `/projects/${projectId}/repository/files/${encodeURIComponent(
      file
    )}/raw?ref=${ref}`
  );
  return result.data;
}
