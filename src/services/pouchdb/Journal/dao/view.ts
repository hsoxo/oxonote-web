import {newJournalView} from "@/services/pouchdb/Journal/default";
import {JournalObject, JournalView, JournalViewTypes} from "@/types/journal";
import getConn from "@/services/pouchdb/config";

export const create = async (journalId: string, type: JournalViewTypes = 'list', label = '全部文档') => {
  const PDB = getConn()
  const viewDoc = await newJournalView(journalId, type, label)
  // @ts-ignore
  await PDB.put(viewDoc)
  const journalDoc: JournalObject = await PDB.get(journalId)
  journalDoc.viewIds.push(viewDoc._id)
  // @ts-ignore
  await PDB.put(journalDoc)
  return viewDoc
}

export const update = async (viewId: string, updateKey: 'attribute', value: any) => {
  const PDB = getConn()
  const viewDoc: JournalView = await PDB.get(viewId)
  switch (updateKey) {
    case "attribute": {
      viewDoc.attribute = value
      // @ts-ignore
      await PDB.put(viewDoc)
      return
    }
  }
}

export const remove = async (viewId: string) => {
  const PDB = getConn()

}
