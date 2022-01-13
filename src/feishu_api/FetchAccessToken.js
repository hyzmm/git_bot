import axios from "axios";

function fetchAccessToken() {
  return axios
    .post(
      "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/",
      {
        app_id: "cli_a14fe5f782bb900d",
        app_secret: "BFZf3a5Ro8JGpKszPyuNohgdBTmYbeHe",
      }
    )
    .then((res) => res.data);
}

export { fetchAccessToken };
