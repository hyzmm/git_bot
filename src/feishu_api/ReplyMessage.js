import feiShuAxios from "./Axios.js";

async function feiShuReplyMessage(messageId, content, msgType = "interactive") {
  const res = await feiShuAxios.post(`/im/v1/messages/${messageId}/reply`, {
    receive_id: "oc_f6f980a6c823a0de04c7606ec1b6ed32",
    content: content,
    msg_type: msgType,
  });
  if (res.data.code === 0) {
    return res.data.data;
  }
  return null;
}

export { feiShuReplyMessage };
