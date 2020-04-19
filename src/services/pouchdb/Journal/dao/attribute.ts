import {newJournalAttribute} from "@/services/pouchdb/Journal/default";
import PDB from "@/services/pouchdb/config";
import {AttributeRangeType, JournalAttribute} from "@/types/journal";

export const create = async (journalId: string, attrType: string, attrLabel: string) => {
  const newAttrDoc = await newJournalAttribute(journalId, attrType, attrLabel)
  await PDB.put(newAttrDoc)
  return newAttrDoc
}


export const update = async (attrId: string, updateKey: string, value: any) => {
  const jAttrDoc: JournalAttribute = await PDB.get(attrId)
  switch (updateKey) {
    case "title": {
      jAttrDoc.label = value
      await PDB.put(jAttrDoc)
      break
    }
    case "type": {
      const journalId = attrId.slice(0, 12)
      await PDB.remove(jAttrDoc)
      await create(journalId, value, jAttrDoc.label)
      break
    }
    case "range": {
      jAttrDoc.range = value
      await PDB.put(jAttrDoc)
      break
    }
  }

}

export const remove = async (attrId: string) => {
  const jAttrDoc: JournalAttribute = await PDB.get(attrId)
  await PDB.remove(jAttrDoc)

}