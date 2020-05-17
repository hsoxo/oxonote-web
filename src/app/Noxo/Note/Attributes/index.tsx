import React from 'react'
import { NoteState } from '@/types/states'
import { useSelector } from '@/store'
import { Box } from '@material-ui/core'

import AttributeRow, { AttributeNewRow } from './AttributeRow/index'

import styled from 'styled-components'

const AttributeBlockBox = styled(Box)`
  margin: 0.5rem 1rem;
`

const AttributeBlock = () => {
  const {
    note: { attributes },
    journal: { attrIds: journalAttrOrder },
    journalAttrs
  }: NoteState = useSelector(state => state.get('note'))

  const activeAttrs = []
  for (const attrId of journalAttrOrder) {
    const existAttr = attributes.find(y => y.attrId === attrId)
    if (existAttr) activeAttrs.push(existAttr)
  }

  return (
    <AttributeBlockBox>
      <React.Fragment>
        {activeAttrs.map(value => (
          <AttributeRow key={value.attrId} {...value} />
        ))}
      </React.Fragment>
      <AttributeNewRow />
    </AttributeBlockBox>
  )
}

export default AttributeBlock
