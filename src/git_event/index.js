import handleNoteHook from "./NoteHookHandler.js";
import handleMergeQuest from "./MergeQuestHandler.js";

const gitEventHandler = {
  "Note Hook": handleNoteHook,
  "Merge Request Hook": handleMergeQuest,
};
export default gitEventHandler;
