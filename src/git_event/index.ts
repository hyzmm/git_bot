import handleNoteHook from "./NoteHookHandler";

const gitEventHandler: { [key: string]: Function } = {
  "Note Hook": handleNoteHook,
};
export default gitEventHandler;
