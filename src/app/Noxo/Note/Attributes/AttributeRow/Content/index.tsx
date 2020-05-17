import React from 'react'
import { useSelector } from '@/store'
import { AttributeValue, AttributeValueWrapper } from '../../StyledComponents'

import notePropTypes from '@/types/constants/note-attributes'
import { NoteAttribute } from '@/types/note'
import { NoteState } from '@/types/states'

const Index: React.FunctionComponent<NoteAttribute> = props => {
  const { attrId } = props
  const { journalAttrs }: NoteState = useSelector(state => state.get('note'))
  const { type } = journalAttrs[journalAttrs.findIndex(x => x._id === attrId)]
  const attrInfo = notePropTypes[type]

  return (
    <AttributeValueWrapper>
      <AttributeValue>
        {React.createElement(attrInfo.elem, props)}
      </AttributeValue>
    </AttributeValueWrapper>
  )
}

export default Index
