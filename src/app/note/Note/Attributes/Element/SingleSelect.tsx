import React from 'react'
import { Chip } from '@material-ui/core'
import { ElementProps } from './types'
import BaseElement, {
  ContentPopoverProps,
  ContentViewProps
} from '@/app/note/Note/Attributes/Element/Base'
import BaseSelectEditor from "./BaseSelectEditor";


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
