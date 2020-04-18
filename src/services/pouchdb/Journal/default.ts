import {JournalAttribute, JournalObject, JournalView} from "@/types/journal";
import { customAlphabet } from 'nanoid/async'
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)
import notePropTypes from "@/types/constants/note-attributes";

type NewJournal = () => Promise<JournalObject>

export const newJournal: NewJournal = async () => {
  const newId = await nanoid()
  return {
    _id: `D-${newId}`,
    _rev: '',
    title: '',
    titleIcon: '',
    bannerPic: '',
    createdTime: new Date().getTime(),
    createdUser: '',
    description: '',
    jourAttrs: [],
    views: [],
  }
}

type NewJournalView = (journalId: string) => Promise<JournalView>

export const newJournalView: NewJournalView = async (journalId: string) => {
  const newId = await nanoid()
  return {
    _id: `${journalId}-V-${newId}`,
    _rev: '',
    viewId: newId,
    type: 'list',
    label: '全部文档',
    attribute: [],
    filters: {
      relation: 'and',
      settings: [],
    },
    sorts: [],
  }
}

type NewJournalAttribute = (journalId: string, attrType: string, label: string) => Promise<JournalAttribute>

export const newJournalAttribute: NewJournalAttribute = async (journalId, attrType, label) => {
  const newId = await nanoid()
  return {
    _id: `${journalId}-A-${newId}`,
    _rev: '',
    attrId: newId,
    type: attrType,
    label: label || '',
  }
}