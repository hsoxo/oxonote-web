import {JournalAttribute, JournalEnhancedObject, JournalObject, JournalView} from "@/types/journal";
import {NoteObject, NoteSummaryObject} from "@/types/note";
import notePropTypes from "@/types/constants/note-attributes";
type label = '等于' | '不等于' | '是空' | '不是空' | '是' | '不是' | '包含' | '不包含' | '以...开始' | '以...结束' | '在...之前' | '在...之后'

const isEqual = (source: any, target: any) => {
  return source === target
}

const isEmpty = (source: any, target: any) => {
  if (typeof source === 'boolean') {
    return !source
  } else if (Array.isArray(source)) {
    return !source.length
  } else {
    return !source
  }
}

const isContain = (source: any, target: any) => {
  if (Array.isArray(source)) {
    if (!target) {
      return true
    } else {
      return source.includes(target)
    }
  } else if (typeof source === 'string') {
    return source.indexOf(target || '') >= 0
  } else {
    return false
  }
}

const isStartWith = (source: any, target: any) => {
  if (typeof source === 'string')
    return source.startsWith(target || '')
  else
    return false
}

const isEndWith = (source: any, target: any) => {
  if (typeof source === 'string')
    return source.endsWith(target || '')
  else
    return false
}

const isBefore = (source: any, target: any) => {
  if (typeof source === 'number')
    return source < target
  else
    return false
}

const isAfter = (source: any, target: any) => {
  if (typeof source === 'number')
    return source > target
  else
    return false
}

const listHelper = (journal: JournalObject, notes: Array<NoteObject>, viewSetting: JournalView) => {
  let newNotes: Array<NoteObject> = JSON.parse(JSON.stringify(notes))
  const { filters, sorts } = viewSetting
  const requiredAttrIds: Array<string> = filters.settings.map(x => x.attrId)
  const requiredJourAttrs: {[key: string]: JournalAttribute} = requiredAttrIds.reduce((acc, cur) => {
    // @ts-ignore
    acc[cur] = journal.jourAttrs.find(x => x.attrId === cur)
    return acc
  }, {})
  let filteredNotes = []
  for (const note of newNotes) {
    let pass: Array<boolean> = []
    for (const f of filters.settings) {
      const jAttr = requiredJourAttrs[f.attrId]
      const nAttr = note.attributes.find(x => x.attrId === f.attrId)
      if (!nAttr) {
        if (f.operator === '等于' || f.operator === '不是空' || f.operator === '是' || f.operator === '包含' || f.operator === '以...开始'
          || f.operator === '以...结束' || f.operator === '在...之前' || f.operator === '在...之后') {
          pass.push(false)
        } else if (f.operator === '不等于' || f.operator === '是空' || f.operator === '不是' || f.operator === '不包含') {
          pass.push(true)
        }
      } else {
        const attrProps = notePropTypes[jAttr.type]
        const attrValue = nAttr.value || attrProps.content({attrId: f.attrId, noteInfo: note, jourAttr: jAttr, noteAttr: nAttr})

        if (f.operator === '等于' || f.operator === '是') {
          pass.push(isEqual(attrValue, f.target))
        } else if (f.operator === '不等于' || f.operator === '不是') {
          pass.push(!isEqual(attrValue, f.target))
        } else if (f.operator === '是空') {
          pass.push(isEmpty(attrValue, f.target))
        } else if (f.operator === '不是空') {
          pass.push(!isEmpty(attrValue, f.target))
        } else if (f.operator === '包含') {
          pass.push(isContain(attrValue, f.target))
        } else if (f.operator === '不包含') {
          pass.push(!isContain(attrValue, f.target))
        } else if (f.operator === '以...开始') {
          pass.push(isStartWith(attrValue, f.target))
        } else if (f.operator === '以...结束') {
          pass.push(isEndWith(attrValue, f.target))
        } else if (f.operator === '在...之前') {
          pass.push(isBefore(attrValue, f.target))
        } else if (f.operator === '在...之后') {
          pass.push(isAfter(attrValue, f.target))
        }
      }
    }
    if (filters.relation === 'and' && pass.every(x => x)) {
      filteredNotes.push(note)
    } else if (filters.relation === 'or' && pass.some(x => x)) {
      filteredNotes.push(note)
    }
  }
  return filteredNotes
}

export default listHelper