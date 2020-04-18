import React from 'react'
import { ElementProps } from './types'
import BaseElement, {
  ContentPopoverProps,
  ContentViewProps
} from '@/app/Noxo/Note/Attributes/components/AttributeContentEditor/Base'
import BaseSelectEditor from './BaseSelectEditor'
import {AttributeRangeType} from '@/types/journal'
import { MarginRightChip } from "@/components/OxOUI/Chip";

export const MultiSelectContent = ({ noteAttr, jourAttr }: ContentViewProps) => {
  const { range } = jourAttr
  let curSelections: Array<string> = []
  if (range) curSelections = range.filter(x => x.id === noteAttr.value).map(x => x.label)
  return curSelections.join('')
}


export const MultiSelectContentView: React.FunctionComponent<ContentViewProps> = ({
  noteAttr,
  jourAttr
}) => {
  const range = jourAttr.range || []
  let curSelections: Array<AttributeRangeType> = []
  // @ts-ignore
  if (range) curSelections = range.filter(x => noteAttr.value.includes(x.id))

  return (
    <React.Fragment>
      {curSelections.length ? (
        curSelections.map(x => (
          <MarginRightChip
            key={x.id}
            style={{ backgroundColor: x.color }}
            size="small"
            label={x.label}
          />
        ))
      ) : (
        <span style={{ color: 'grey' }}>空</span>
      )}
    </React.Fragment>
  )
}

const MultiSelectEditor: React.FunctionComponent<ContentPopoverProps> = props => {
  return <BaseSelectEditor isMulti={true} {...props} />
}

const MultiSelectAttributeBody = (props: ElementProps) => {
  return (
    <BaseElement
      {...props}
      editable={true}
      display={MultiSelectContentView}
      popover={MultiSelectEditor}
    />
  )
}

export default MultiSelectAttributeBody
