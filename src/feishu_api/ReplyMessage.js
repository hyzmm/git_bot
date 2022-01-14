import feiShuAxios from "./Axios.js";
import { CHAT_ID } from "./SendMessage.js";

async function feiShuReplyMessage(messageId, content, msgType = "interactive") {
  try {
    const res = await feiShuAxios.post(`/im/v1/messages/${messageId}/reply`, {
      receive_id: CHAT_ID,
      content: content,
      msg_type: msgType,
    });
    if (res.data.code === 0) {
      return res.data.data;
    }
  } catch (e) {
    console.error("reply message filed", e);
  }
  return null;
}

export { feiShuReplyMessage };
