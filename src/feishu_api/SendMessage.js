import feiShuAxios from "./Axios.js";

// export const CHAT_ID = "oc_f6f980a6c823a0de04c7606ec1b6ed32";
export const CHAT_ID = "oc_1cb6059bf5904a54d2a435a691b7f5bd";

// getChats();
export async function getChats() {
  const result = await feiShuAxios.get("/im/v1/chats");
  console.log(result.data);
}

async function feiShuSendMessage(content, msgType = "interactive") {
  content = content.replaceAll("`", "");
  try {
    const res = await feiShuAxios.post(
      "/im/v1/messages?receive_id_type=chat_id",
      {
        receive_id: CHAT_ID,
        content: content,
        msg_type: msgType,
      }
    );
    if (res.data.code === 0) {
      return res.data.data;
    }
  } catch (e) {
    console.error("send message failed ", e);
  }
  return null;
}

export { feiShuSendMessage };
