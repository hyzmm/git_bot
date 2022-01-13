import { feiShuSendMessage } from "../feishu_api/SendMessage.js";

export const mergeRequestMessages = {};

export default async function handleMergeQuest(body) {
  const { title, description, iid } = body.object_attributes;
  const labels = body.labels.map((e) => e.title).join(" ");
  const creator = body.user;
  const assignee = body.assignee;

  const msg = {
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
  const sendResult = await feiShuSendMessage(
    JSON.stringify(msg),
    "interactive"
  );
  if (sendResult) {
    mergeRequestMessages[iid] = sendResult;
  }
}
