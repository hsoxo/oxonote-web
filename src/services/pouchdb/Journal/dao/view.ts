import {newJournalView} from "@/services/pouchdb/Journal/default";
import {JournalView} from "@/types/journal";
import getConn from "@/services/pouchdb/config";

export const create = async (journalId: string) => {
  const PDB = getConn()
  const viewDoc = await newJournalView(journalId)
  // @ts-ignore
  await PDB.put(viewDoc)
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

export const remove = async () => {
  const PDB = getConn()

}
