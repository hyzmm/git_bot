import { mergeRequestMessages } from "./MergeQuestHandler.js";
import { feiShuReplyMessage } from "../feishu_api/ReplyMessage.js";
import { feiShuSendMessage } from "../feishu_api/SendMessage.js";
import { getFileContent } from "../gitlab_api/index.js";

export const discussionMessages = {};

export default async function handleNoteHook(body) {
  const { type, discussion_id, project_id, position, note } =
    body.object_attributes;
  const { source_branch, target_branch } = body.merge_request;
  const prId = body.merge_request.iid;
  let feishuMessage;
  let contentBody = note;
  /// 对 PR 评论
  if (type === "DiffNote") {
    let { new_path, new_line } = position;
    new_line--;
    const file = await getFileContent(project_id, new_path, source_branch);
    const codeLines = file.split("\n");
    codeLines[new_line] = `**${codeLines[new_line]}**`;
    const codes = codeLines
      .slice(Math.max(0, new_line - 2), new_line + 2)
      .map((e) => `> ${e}`)
      .join("\n");
    contentBody =
      `📄 ${new_path}\n**代码片段**\n_${codes}_` + "\n" + contentBody;
    feishuMessage = discussionMessages[discussion_id];
  }
  if (feishuMessage == null) {
    feishuMessage = mergeRequestMessages[prId];
  }
  contentBody = `**${body.user.name}** 评论了\n` + contentBody;
  const content = {
    config: {
      wide_screen_mode: true,
    },
    elements: [
      {
        tag: "div",
        text: {
          content: `${contentBody}`,
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
    sendResult.iid = prId;
    discussionMessages[discussion_id] = sendResult;
  }
  return "ok";
}
