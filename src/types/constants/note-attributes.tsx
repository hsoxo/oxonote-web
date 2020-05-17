import React from 'react'

import AccessTimeIcon from '@material-ui/icons/AccessTime'
import PersonIcon from '@material-ui/icons/Person'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import CheckBoxIcon from '@material-ui/icons/CheckBox'

import * as Elements from '@/app/Noxo/Note/Attributes/AttributeRow/Content/AttributeContentEditor'

import { NoteAttributeTypesObject } from '@/types/note-attribute'

export const SINGLE_SELECT = 'SINGLE_SELECT'
export const MULTI_SELECT = 'MULTI_SELECT'
export const TEXT = 'TEXT'
export const CHECKBOX = 'CHECKBOX'
export const CREATED_TIME = 'CREATED_TIME'
export const CREATED_USER = 'CREATED_USER'
export const UPDATED_TIME = 'UPDATED_TIME'
export const UPDATED_USER = 'UPDATED_USER'

const notePropTypes: NoteAttributeTypesObject = {
  [SINGLE_SELECT]: {
    defaultLabel: '单选',
    special: false,
    icon: <RadioButtonCheckedIcon fontSize={'inherit'} />,
    defaultValue: () => '',
    elem: Elements.SingleSelect,
    content: Elements.SingleSelectContent,
    contentView: Elements.SingleSelectContentView,
    operators: [
      {
        label: '等于',
        target: 'selection'
      },
      {
        label: '不等于',
        target: 'selection'
      },
      {
        label: '是空',
        target: ''
      },
      {
        label: '不是空',
        target: ''
      }
    ]
  },
  [MULTI_SELECT]: {
    defaultLabel: '多选',
    special: false,
    icon: <DoneAllIcon fontSize={'inherit'} />,
    defaultValue: () => [],
    elem: Elements.MultiSelect,
    content: Elements.MultiSelectContent,
    contentView: Elements.MultiSelectContentView,
    operators: [
      {
        label: '包含',
        target: 'selection'
      },
      {
        label: '不包含',
        target: 'selection'
      },
      {
        label: '是空',
        target: ''
      },
      {
        label: '不是空',
        target: ''
      }
    ]
  },
  [TEXT]: {
    defaultLabel: '文本',
    special: false,
    icon: <TextFieldsIcon fontSize={'inherit'} />,
    defaultValue: () => '',
    elem: Elements.Text,
    content: Elements.TextContent,
    contentView: Elements.TextContentView,
    operators: [
      {
        label: '包含',
        target: 'input'
      },
      {
        label: '不包含',
        target: 'input'
      },
      {
        label: '等于',
        target: 'input'
      },
      {
        label: '不等于',
        target: 'input'
      },
      {
        label: '以...开始',
        target: 'input'
      },
      {
        label: '以...结束',
        target: 'input'
      },
      {
        label: '是空',
        target: ''
      },
      {
        label: '不是空',
        target: ''
      }
    ]
  },
  [CHECKBOX]: {
    defaultLabel: '复选框',
    special: false,
    icon: <CheckBoxIcon fontSize={'inherit'} />,
    defaultValue: () => false,
    elem: Elements.Checkbox,
    content: Elements.CheckboxContent,
    contentView: Elements.CheckboxContentView,
    operators: [
      {
        label: '是',
        target: ''
      },
      {
        label: '不是',
        target: ''
      }
    ]
  },
  // '10': {
  // 	defaultLabel: '日期',
  // 	special: false,
  // 	icon: <EventNoteIcon />,
  // 	defaultValue: () => '',
  // 	elem: () => <div></div>,
  // },
  // 9: {
  //   defaultLabel: 'Link',
  //   icon: <LinkIcon/>,
  //   defaultValue: () => '',
  //   elem: () => <div></div>,
  // },
  [CREATED_TIME]: {
    defaultLabel: '创建时间',
    special: true,
    icon: <AccessTimeIcon fontSize={'inherit'} />,
    defaultValue: () => null,
    elem: Elements.CreatedTime,
    content: Elements.CreatedTimeContent,
    contentView: Elements.CreatedTimeContentView,
    operators: [
      {
        label: '是',
        target: 'date'
      },
      {
        label: '在...之前',
        target: 'date'
      },
      {
        label: '在...之后',
        target: 'date'
      }
    ]
  },
  [UPDATED_TIME]: {
    defaultLabel: '最后编辑时间',
    special: true,
    icon: <AccessTimeIcon fontSize={'inherit'} />,
    defaultValue: () => null,
    elem: Elements.ModifiedTime,
    content: Elements.ModifiedTimeContent,
    contentView: Elements.ModifiedTimeContentView,
    operators: [
      {
        label: '是',
        target: 'date'
      },
      {
        label: '在...之前',
        target: 'date'
      },
      {
        label: '在...之后',
        target: 'date'
      }
    ]
  },
  [CREATED_USER]: {
    defaultLabel: '创建人',
    special: true,
    icon: <PersonIcon fontSize={'inherit'} />,
    defaultValue: () => null,
    elem: Elements.CreatedBy,
    content: Elements.CreatedByContent,
    contentView: Elements.CreatedByContentView,
    operators: [
      {
        label: '是',
        target: 'user'
      },
      {
        label: '不是',
        target: 'user'
      }
    ]
  },
  [UPDATED_USER]: {
    defaultLabel: '最后编辑人',
    special: true,
    icon: <PersonIcon fontSize={'inherit'} />,
    defaultValue: () => null,
    elem: Elements.ModifiedBy,
    content: Elements.ModifiedByContent,
    contentView: Elements.ModifiedByContentView,
    operators: [
      {
        label: '是',
        target: 'user'
      },
      {
        label: '不是',
        target: 'user'
      }
    ]
  }
}

export default notePropTypes
