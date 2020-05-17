import {
  AttributeRangeType,
  JournalAttribute,
  JournalObject,
  JournalView,
  JournalViewTypes
} from '@/types/journal'
import { customAlphabet } from 'nanoid/async'
import { tagColorList } from '@/types/constants/colors'

const nanoid = customAlphabet(
  '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  10
)

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
    attrIds: [],
    jourAttrs: [],
    viewIds: []
  }
}

type NewJournalView = (
  journalId: string,
  type?: JournalViewTypes,
  label?: string
) => Promise<JournalView>
export const newJournalView: NewJournalView = async (
  journalId: string,
  type: JournalViewTypes = 'list',
  label = '全部文档'
) => {
  const newId = await nanoid()
  return {
    _id: `${journalId}-V-${newId}`,
    _rev: '',
    type: type || 'list',
    viewId: newId,
    label: label || '全部文档',
    attribute: [],
    filters: {
      relation: 'and',
      settings: []
    },
    sorts: []
  }
}

type NewJournalAttribute = (
  journalId: string,
  attrType: string,
  label: string
) => Promise<JournalAttribute>
export const newJournalAttribute: NewJournalAttribute = async (
  journalId,
  attrType,
  label
) => {
  const newId = await nanoid()
  return {
    _id: `${journalId}-A-${newId}`,
    _rev: '',
    attrId: newId,
    type: attrType,
    label: label || ''
  }
}

type NewJournalAttributeRangeItem = (
  label: string
) => Promise<AttributeRangeType>
export const newRangeItem: NewJournalAttributeRangeItem = async label => {
  return {
    id: label,
    label,
    color: tagColorList[Math.floor(Math.random() * tagColorList.length)]
  }
}
