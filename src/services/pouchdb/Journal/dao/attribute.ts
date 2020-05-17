import { newJournalAttribute } from '@/services/pouchdb/Journal/default'
import { JournalAttribute, JournalObject } from '@/types/journal'
import getConn from '@/services/pouchdb/config'

export const create = async (
  journalId: string,
  attrType: string,
  attrLabel: string,
  replace: string | null = null
) => {
  const PDB = getConn()
  const newAttrDoc = await newJournalAttribute(journalId, attrType, attrLabel)
  await PDB.put(newAttrDoc)
  const journalDoc: JournalObject = await PDB.get(journalId)
  if (replace) {
    const replaceIndex = journalDoc.attrIds.findIndex(x => x === replace)
    journalDoc.attrIds.splice(replaceIndex, 1, newAttrDoc._id)
  } else {
    journalDoc.attrIds.push(newAttrDoc._id)
  }
  // @ts-ignore
  await PDB.put(journalDoc)
  return newAttrDoc
}

export const update = async (attrId: string, updateKey: string, value: any) => {
  const PDB = getConn()
  const jAttrDoc: JournalAttribute = await PDB.get(attrId)
  switch (updateKey) {
    case 'title': {
      jAttrDoc.label = value
      await PDB.put(jAttrDoc)
      break
    }
    case 'type': {
      await PDB.remove(jAttrDoc)
      const journalId = attrId.slice(0, 12)
      await create(journalId, value, jAttrDoc.label, jAttrDoc._id)
      break
    }
    case 'range': {
      jAttrDoc.range = value
      await PDB.put(jAttrDoc)
      break
    }
  }
}

export const remove = async (attrId: string) => {
  const PDB = getConn()
  const jAttrDoc: JournalAttribute = await PDB.get(attrId)
  await PDB.remove(jAttrDoc)
}
