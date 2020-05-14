import React from 'react'
import {Chip} from '@material-ui/core'
import {ElementProps} from './types'
import BaseElement, {ContentPopoverProps, ContentViewProps} from './Base'
import BaseSelectEditor from "./BaseSelectEditor";
import {AttributeRangeType} from "@/types/journal";

export const SingleSelectContent = ({ noteAttr, jourAttr }: ContentViewProps) => {
  const { range } = jourAttr
  let curSelection: Array<AttributeRangeType> = []
  if (range) curSelection = range.filter(x => x.id === noteAttr.value)
  return curSelection.length > 0 ? curSelection[0].label : ''
}

export const SingleSelectContentView: React.FunctionComponent<ContentViewProps> = ({
  noteAttr,
  jourAttr
}) => {
  const { range } = jourAttr
  let curSelection
  if (range) curSelection = range.filter(x => x.id === noteAttr.value)[0]

  return (
    <React.Fragment>
      {noteAttr.value && curSelection ? (
        <Chip
          style={{ backgroundColor: curSelection.color }}
          size="small"
          label={curSelection.label}
        />
      ) : (
        <span style={{ color: 'grey' }}>空</span>
      )}
    </React.Fragment>
  )
}

const SingleSelectEditor: React.FunctionComponent<ContentPopoverProps> = (props) => {
  return <BaseSelectEditor isMulti={false} {...props}/>
}

const SingleSelectAttributeBody = (props: ElementProps) => {
  return (
    <BaseElement
      {...props}
      editable={true}
      display={SingleSelectContentView}
      popover={SingleSelectEditor}
    />
  )
}

export default SingleSelectAttributeBody
