
interface NoteContent {
    type: string
    children: Array<any>
}

interface NoteAttribute {
    attrId: string
    value: string | Array<string>
}

export interface NoteShortType {
    _id: string
    title: string
    titleIcon: string
    createdTime: number
    createdUser: string
    modifiedTime: number
    modifiedUser: string
    attributes: Array<NoteAttribute>
}

export interface NoteType {
    _id: string
    journalId: string
    title: string
    titleIcon: string
    bannerImg: string
    createdTime: number
    createdUser: string
    modifiedTime: number
    modifiedUser: string
    content: Array<NoteContent>
    attributes: Array<NoteAttribute>
}
