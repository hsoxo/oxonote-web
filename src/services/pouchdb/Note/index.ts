import PDB from "@/services/pouchdb/config";
import {NoteContent} from "@/types/note";

const primaryDao = require('./dao/primary')
export const { create, update, readOne } = primaryDao

export const attribute = require('./dao/attribute')

export const content = {
  update: async (noteId: string, content: any) => {
    const contentId = `${noteId}-C`
    const contentDoc: NoteContent = await PDB.get(contentId)
    contentDoc.content = content
    await PDB.put(contentDoc)
    return contentDoc
  }
}