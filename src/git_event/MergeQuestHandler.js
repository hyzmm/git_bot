import { feiShuSendMessage } from "../feishu_api/SendMessage.js";
import { feiShuReplyMessage } from "../feishu_api/ReplyMessage.js";
import { discussionMessages } from "./NoteHookHandler.js";

export const mergeRequestMessages = {};

export default async function handleMergeQuest(body) {
  const { title, description, iid, state } = body.object_attributes;
  const labels = body.labels.map((e) => e.title).join(" ");
  const creator = body.user;
  const assignee = body.assignee;

  let msg;
  let type;
  switch (state) {
    case "opened":
      msg = {
        config: {
          wide_screen_mode: true,
        },
        elements: [
          {
            tag: "div",
            fields: [
              {
                is_short: true,
                text: {
                  tag: "lark_md",
                  content: `**☃️ 创建者：**${creator.name}`,
                },
              },
              {
                is_short: true,
                text: {
                  tag: "lark_md",
                  content: `**👉 指派给：** ${assignee.name}`,
                },
              },
            ],
          },
          {
            tag: "div",
            text: {
              content: `**🏷️ ${labels}**`,
              tag: "lark_md",
            },
          },
          {
            tag: "div",
            text: {
              content: `**📖 描述内容**\n${description}`,
              tag: "lark_md",
            },
          },
        ],
        header: {
          template: "deepblue",
          title: {
            content: `📕 ${title}`,
            tag: "plain_text",
          },
        },
      };
      type = "interactive";
      const sendResult = await feiShuSendMessage(
        JSON.stringify(msg),
        "interactive"
      );
      if (sendResult) {
        mergeRequestMessages[iid] = sendResult;
      }
      break;
    case "merged":
    case "closed":
      if (state === "merged") {
        msg = { text: `${creator.name} 合并了此分支` };
      } else {
        msg = { text: `${creator.name} 关闭了此分支` };
      }

      if (!mergeRequestMessages[iid]) return;
      const chatId = mergeRequestMessages[iid].message_id;

      delete mergeRequestMessages[iid];
      Object.entries(discussionMessages).forEach(([k, v]) => {
        if (v.iid === iid) {
          delete discussionMessages[k];
        }
      });

      await feiShuReplyMessage(chatId, JSON.stringify(msg), "text");
      break;
  }
}
