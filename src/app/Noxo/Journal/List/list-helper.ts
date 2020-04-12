import {JournalView} from "@/types/journal";
import {NoteSummaryObject} from "@/types/note";

const listHelper = (notes: Array<NoteSummaryObject>, viewSetting: JournalView) => {
  let newNotes = JSON.parse(JSON.stringify(notes))

}