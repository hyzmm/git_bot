import gitEventHandler from "./git_event/index.js";
import express from "express";

const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  const gitLabEvent = req.headers["x-gitlab-event"];
  const handler = gitEventHandler[gitLabEvent];
  if (handler) {
    const result = handler.call(null, req.body);
    res.send(result);
    console.log("handled", JSON.stringify(req.body));
  } else {
    res.send("do nothing");
    console.log("unhandled", JSON.stringify(req.body));
  }
});

app.listen(8080);
