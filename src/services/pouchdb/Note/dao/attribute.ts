import {NoteObject} from "@/types/note";
import notePropTypes, {MULTI_SELECT, SINGLE_SELECT} from "@/types/constants/note-attributes";
import {JournalAttribute} from "@/types/journal";
import {newRangeItem} from "@/services/pouchdb/Journal/default";
import getConn from "@/services/pouchdb/config";
const journalService = require('../../Journal/index')


export const create = async (noteId: string, type: string, label: string) => {
  const PDB = getConn()
  const noteDoc: NoteObject = await PDB.get(noteId)
  const journalId = noteDoc.journalId
  const jAttr = await journalService.attr.create(journalId, type, label)
  noteDoc.attributes.push({
    attrId: jAttr._id,
    value: notePropTypes[type].defaultValue()
  })
  await PDB.put(noteDoc)
}

export const updateValue = async (noteId: string, attrId: string, value: string | Array<string>) => {
  const PDB = getConn()
  const doc: NoteObject = await PDB.get(noteId)
  const attrDoc: JournalAttribute = await PDB.get(attrId)
  const curAttr = doc.attributes[doc.attributes.findIndex(x => x.attrId === attrId)]
  if (doc) {
    if (attrDoc.type === SINGLE_SELECT && typeof value === 'string') {
      if (attrDoc.range) {
        if (value && attrDoc.range.some(x => x.id === value)) {
          curAttr.value = value
        } else {
          attrDoc.range.push(await newRangeItem(value))
          await PDB.put(attrDoc)
          curAttr.value = attrDoc.range.slice(-1)[0].id
        }
      } else {
        attrDoc.range = [await newRangeItem(value)]
        await PDB.put(attrDoc)
        curAttr.value = value
      }
    } else if (attrDoc.type === MULTI_SELECT && Array.isArray(value) && value.length > 0) {
      if (attrDoc.range) {
        const newValue = value.filter(x => attrDoc.range && !attrDoc.range.some(y => x === y.label))
        if (newValue.length > 0) {
          for (const x of newValue) {
            attrDoc.range.push(await newRangeItem(x))
          }
          await PDB.put(attrDoc)
        }
        curAttr.value = value
      } else {
        attrDoc.range = [await newRangeItem(value.slice(-1)[0])]
        await PDB.put(attrDoc)
        curAttr.value = value
      }
    } else {
      curAttr.value = value
    }
    await PDB.put(doc)
  }
}