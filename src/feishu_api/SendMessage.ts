import feiShuAxios from "./Axios";

interface SendMessageReq {
  receive_id: string;
  content: string;
  msg_type: string;
}

async function feiShuSendMessage() {
  const res = await feiShuAxios.post(
    "/im/v1/messages?receive_id_type=chat_id",
    {
      receive_id: "oc_f6f980a6c823a0de04c7606ec1b6ed32",
      content:
        '{"text":"<at user_id=\\"ou_155184d1e73cbfb8973e5a9e698e74f2\\">Tom</at>  d "}',
      msg_type: "text",
    } as SendMessageReq
  );
}

export { SendMessageReq, feiShuSendMessage };
