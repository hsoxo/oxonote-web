import {customAlphabet} from 'nanoid/async'
import {JournalAttribute, JournalObject} from "@/types/journal";
import notePropTypes from "@/types/constants/note-attributes";
import {NoteObject} from "@/types/note";

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)


type NewNote = (journal: JournalObject, jAttrs: Array<JournalAttribute>) => Promise<NoteObject>

export const newNote: NewNote = async (journal, jAttrs) => {
  const newId = await nanoid()
  return {
    _id: `N-${newId}`,
    _rev: '',
    journalId: journal._id,
    title: '',
    titleIcon: '',
    bannerImg: '',
    createdTime: new Date().getTime(),
    createdUser: '',
    modifiedTime: new Date().getTime(),
    modifiedUser: '',
    content: [],
    attributes: jAttrs.map(x => ({
      attrId: x._id,
      value: notePropTypes[x.type].defaultValue()
    })),
  }
}

type NewNoteContent = (noteId: string) => Promise<any>

export const newNoteContent: NewNoteContent = async (noteId) => {
  return {
    _id: `${noteId}-C`,
    _rev: '',
    content: [{ type: 'paragraph', children: [{text: ''}], root: true }]
  }
}