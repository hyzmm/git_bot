import gitEventHandler from "./git_event";
import express from "express";

// feiShuSendMessage();

const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  const gitLabEvent = req.headers["x-gitlab-event"] as string;
  const handler = gitEventHandler[gitLabEvent];
  if (handler) {
    const result = handler.call(null, req.body);
    res.send(result);
  } else {
    res.send("do nothing");
  }
});

app.listen(8080);
