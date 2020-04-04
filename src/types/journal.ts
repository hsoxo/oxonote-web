import { NoteShortType } from "@/types/note";

export interface JournalAttributeObject {
    attrId: string
    type: string
    label: string
}

interface OnChangeFunction {
    (key: string, value: any): void
}

interface ViewCreateFunction {
    (key: string, value: any): void
}

interface ViewDeleteFunction {
    (key: string, value: any): void
}

interface ViewChangeFunction {
    (key: string, value: any): void
}

export interface JournalContextObject {
    nAttrs: Array<JournalAttributeObject>
    viewId: string
    onChange: OnChangeFunction
    handleViewCreate: ViewCreateFunction
    handleViewDelete: ViewDeleteFunction
    handleViewChange: ViewChangeFunction
}

interface JournalView {
    viewId: string
    label: string
    attribute: Array<any>
    filter: Array<any>
    sort: Array<any>
}

interface JournalAttribute {
    attrId: string
    type: string
    label: string
}

export interface JournalType {
    _id: string,
    title: string,
    titleIcon: string,
    bannerPic: string,
    createdTime: number,
    createdUser: string,
    description: string,
    views: Array<JournalView>,
    jourAttrs: Array<JournalAttribute>
}

export interface JournalEnhancedType extends JournalType {
    notes: Array<NoteShortType>
}