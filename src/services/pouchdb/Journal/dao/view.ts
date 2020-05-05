import {newJournalView} from "@/services/pouchdb/Journal/default";
import {JournalAttribute, JOURNAL_KANBAN_VIEW, JournalObject, JournalView, JournalViewTypes} from "@/types/journal";
import getConn from "@/services/pouchdb/config";
import {MULTI_SELECT, SINGLE_SELECT} from "@/types/constants/note-attributes";
import { create as createAttr } from './attribute'

export const create = async (journalId: string, type: JournalViewTypes = 'list', label = '全部文档') => {
  const PDB = getConn()
  const viewDoc = await newJournalView(journalId, type, label)

  const journalDoc: JournalObject = await PDB.get(journalId)
  if (viewDoc.type === JOURNAL_KANBAN_VIEW) {
    for (const attrId of journalDoc.attrIds) {
      const attrDoc: JournalAttribute = await PDB.get(attrId)
      if (attrDoc.type === SINGLE_SELECT || attrDoc.type === MULTI_SELECT) {
        viewDoc.kanbanAttrId = attrDoc._id
        break
      }
    }
    if (!viewDoc.kanbanAttrId) {
      const attrDoc = await createAttr(journalDoc._id, SINGLE_SELECT, '状态')
      viewDoc.kanbanAttrId = attrDoc._id
    }
  }
  // @ts-ignore
  await PDB.put(viewDoc)
  const journalDoc2: JournalObject = await PDB.get(journalId)
  journalDoc2.viewIds.push(viewDoc._id)
  // @ts-ignore
  await PDB.put(journalDoc2)
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
