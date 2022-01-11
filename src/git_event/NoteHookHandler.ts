import { GitNoteObject } from "./models/GitNoteObject";

export default function handleNoteHook(body: GitNoteObject): Object {
  console.log(JSON.stringify(body));
  return "ok";
}
