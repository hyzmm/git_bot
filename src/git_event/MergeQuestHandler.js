import { feiShuSendMessage } from "../feishu_api/SendMessage.js";
import { feiShuReplyMessage } from "../feishu_api/ReplyMessage.js";
import { discussionMessages } from "./NoteHookHandler.js";
import { getGitLabUserInfo } from "../gitlab_api/index.js";

export const mergeRequestMessages = {};

export default async function handleMergeQuest(body) {
  const {
    title,
    description,
    iid,
    state,
    author_id,
    source_branch,
    target_branch,
  } = body.object_attributes;
  const labels = body.labels.map((e) => e.title).join(" ");
  const { user } = body;
  const assignee = body.assignee;

  let authorName = "";
  try {
    const author = await getGitLabUserInfo(author_id);
    authorName = author.name;
  } catch (e) {}
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
                  content: `**☃️ 创建者：**${authorName}`,
                },
              },
              {
                is_short: true,
                text: {
                  tag: "lark_md",
                  content: `**👉 指派给：** ${
                    assignee ? assignee.name : "任意"
                  }`,
                },
              },
            ],
          },
          {
            tag: "div",
            fields: [
              {
                is_short: true,
                text: {
                  tag: "lark_md",
                  content: `**🛠️️ 来源分支：**${source_branch}`,
                },
              },
              {
                is_short: true,
                text: {
                  tag: "lark_md",
                  content: `**🎯 目标分支：** ${target_branch}`,
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
      return;
      if (state === "merged") {
        msg = { text: `${user.name} 合并了此 PR` };
      } else {
        msg = { text: `${user.name} 关闭了此 PR` };
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
