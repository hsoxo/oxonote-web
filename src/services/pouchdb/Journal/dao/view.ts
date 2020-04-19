import {newJournalView} from "@/services/pouchdb/Journal/default";
import PDB from "@/services/pouchdb/config";

export const create = async (journalId: string) => {
  const viewDoc = await newJournalView(journalId)
  // @ts-ignore
  await PDB.put(viewDoc)
  return viewDoc
}
export const update = async () => {

}
export const remove = async () => {

}
