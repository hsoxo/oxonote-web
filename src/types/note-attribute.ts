import React from 'react'
import { ElementProps } from '@/app/Noxo/Note/Attributes/AttributeRow/Content/AttributeContentEditor/types'
import { ContentViewProps } from '@/app/Noxo/Note/Attributes/AttributeRow/Content/AttributeContentEditor/Base'

interface Operators {
  label:
    | '等于'
    | '不等于'
    | '是空'
    | '不是空'
    | '是'
    | '不是'
    | '包含'
    | '不包含'
    | '以...开始'
    | '以...结束'
    | '在...之前'
    | '在...之后'
  target: '' | 'input' | 'date' | 'selection' | 'user'
}

interface NoteAttributeTypeObject {
  defaultLabel: string
  special: boolean
  icon: React.ComponentElement<void, any>
  defaultValue: () => any
  elem: (props: ElementProps) => JSX.Element
  content: (
    props: ContentViewProps
  ) => string | Array<string> | boolean | number
  contentView: React.FunctionComponent<ContentViewProps>
  operators: Array<Operators>
}

export interface NoteAttributeTypesObject {
  [key: string]: NoteAttributeTypeObject
}
