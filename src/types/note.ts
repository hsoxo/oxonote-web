export interface NoteObject {
  _id: string
  _rev: string
  journalId: string
  title: string
  titleIcon: string
  bannerImg: string
  createdTime: number
  createdUser: string
  modifiedTime: number
  modifiedUser: string
  content: Array<_NoteContent>
  attributes: Array<NoteAttribute>
}

export type NoteContent = {
  _id: string
  _rev: string
  content: Array<_NoteContent>
}

export interface NoteSummaryObject {
  _id: string
  title: string
  titleIcon: string
  createdTime: number
  createdUser: string
  modifiedTime: number
  modifiedUser: string
  attributes: Array<NoteAttribute>
}

interface _NoteContent {
  type: string
  children: Array<any>
  root: boolean
}

export interface NoteAttribute {
  attrId: string
  value: string | Array<string> | boolean
}
