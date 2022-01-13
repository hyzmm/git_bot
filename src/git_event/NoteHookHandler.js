import { mergeRequestMessages } from "./MergeQuestHandler.js";
import { feiShuReplyMessage } from "../feishu_api/ReplyMessage.js";
import { feiShuSendMessage } from "../feishu_api/SendMessage.js";

const discussionMessages = {};

export default async function handleNoteHook(body) {
  const { type, description, discussion_id, position, note } =
    body.object_attributes;
  const prId = body.merge_request.iid;
  let feishuMessage;
  let contentBody = note;
  /// 对 PR 评论
  if (type === "DiffNote") {
    feishuMessage = discussionMessages[discussion_id];
  }
  if (feishuMessage == null) {
    feishuMessage = mergeRequestMessages[prId];
  }

  const content = {
    config: {
      wide_screen_mode: true,
    },
    elements: [
      {
        tag: "div",
        text: {
          content: `${note}`,
          tag: "lark_md",
        },
      },
    ],
  };
  let sendResult;
  if (feishuMessage) {
    const replyId = feishuMessage.message_id;
    sendResult = await feiShuReplyMessage(
      replyId,
      JSON.stringify(content),
      "interactive"
    );
  } else {
    sendResult = await feiShuSendMessage(
      JSON.stringify(content),
      "interactive"
    );
  }

  if (sendResult) {
    discussionMessages[discussion_id] = sendResult;
  }
  return "ok";
}
