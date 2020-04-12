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

export interface JournalViewFiltersSetting {
    attrId: string | null
    operator: string | null
    target: string | null
    date: number | null
}

export type JournalViewTypes = 'table' | 'list' | 'gallery' | 'board'

export interface JournalView {
    type: JournalViewTypes
    viewId: string
    label: string
    attribute: Array<{ attrId: string, status: boolean}>
    filters: {
        relation: 'and' | 'or'
        settings: Array<JournalViewFiltersSetting>
    }
    sorts: Array<{ attrId: string, direction: '+' | '-' | '' }>
}

export interface AttributeRangeType {
    id: string
    label: string
    color: string
}

export interface JournalAttribute {
    attrId: string
    type: string
    label: string
    range?: Array<AttributeRangeType>
}

export interface JournalType {
    _id: string,
    _rev: string,
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