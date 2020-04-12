import { NoteSummaryObject } from "@/types/note";

export interface JournalObject {
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

export interface JournalAttribute {
    attrId: string
    type: string
    label: string
    range?: Array<AttributeRangeType>
}

export interface JournalView {
    type: JournalViewTypes
    viewId: string
    label: string
    attribute: Array<JournalViewAttribute>
    filters: JournalViewFilter
    sorts: Array<JournalViewSort>
}

export type JournalViewTypes = 'table' | 'list' | 'gallery' | 'board'
export interface JournalViewSort {
    attrId: string
    direction: '+' | '-' | ''
}

export interface JournalViewAttribute {
    attrId: string
    status: boolean
}
export interface JournalViewFiltersSetting {
    attrId: string | null
    operator: string | null
    target: string | null
    date: number | null
}
export interface JournalViewFilter {
    relation: 'and' | 'or'
    settings: Array<JournalViewFiltersSetting>
}


export interface AttributeRangeType {
    id: string
    label: string
    color: string
}

export interface JournalEnhancedObject extends JournalObject {
    notes: Array<NoteSummaryObject>
}