import axios from "axios";

const gitlabAxios = axios.create({
  baseURL: "http://git.ids111.com/api/v4",
});
gitlabAxios.defaults.headers["PRIVATE-TOKEN"] = "sPH4YKs6jxCkARBYsJ8Y";

export async function getGitLabUserInfo(id) {
  const result = await gitlabAxios.get(`/users/${id}`);
  return result.data;
}

export async function getFileContent(projectId, file, ref) {
  const result = await gitlabAxios.get(
    `/projects/${projectId}/repository/files/${file}/raw?ref=${ref}`
  );
  return result.data;
}
