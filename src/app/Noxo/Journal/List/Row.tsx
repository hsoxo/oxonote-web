import React from 'react'
import { Box } from '@material-ui/core'
import { NoteAttribute, NoteObject } from '@/types/note'
import styled from 'styled-components'
import { JournalAttribute, JournalView } from '@/types/journal'
import notePropTypes from '@/types/constants/note-attributes'
import { FlexCenteredBox } from '@/components/OxOUI/OxOBox'

type JournalListViewRowProps = {
  note: NoteObject
  view: JournalView
  activeAttrs: Array<JournalAttribute>
}

const JournalListViewRow: React.FunctionComponent<JournalListViewRowProps> = ({
  note: noteInfo,
  view: curView,
  activeAttrs
}) => {
  if (!curView) return null

  const noteAttr = (noteInfo.attributes.find(
    x => x.attrId === x.attrId
  ) as unknown) as NoteAttribute

  return (
    <JournalListViewRowBox>
      <JournalListViewRowIcon>
        {noteInfo.titleIcon || '📄'}
      </JournalListViewRowIcon>
      <JournalListViewRowTitle>
        {noteInfo.title || '未命名笔记'}
      </JournalListViewRowTitle>
      <JournalListViewRowRight>
        {activeAttrs.map(x => (
          <FlexCenteredRightMarginBox key={x._id}>
            {notePropTypes[x.type].contentView({
              ...x,
              jourAttr: x,
              noteInfo,
              noteAttr: (noteInfo.attributes.find(
                y => y.attrId === x._id
              ) as unknown) as NoteAttribute
            })}
          </FlexCenteredRightMarginBox>
        ))}
      </JournalListViewRowRight>
    </JournalListViewRowBox>
  )
}

const JournalListViewRowBox = styled(Box)`
  display: flex;
  align-items: center;
  padding: 0.3rem 1rem;
  transition: background 180ms ease-in 0s;
  border-radius: 5px;
  height: 2.3rem;
  font-size: medium;
  &:hover {
    background-color: var(--secondary-bg-hover);
  }
`

const JournalListViewRowIcon = styled(Box)`
  display: flex;
  margin-top: 1px;
  margin-right: 0.3rem;
`

const JournalListViewRowTitle = styled(Box)`
  display: flex;
  margin-right: auto;
  text-overflow: ellipsis;
  color: var(--primary-text);
  border-bottom: 1px solid var(--secondary-text);
  margin-top: 3px;
  &:hover {
    cursor: pointer;
  }
`

const JournalListViewRowRight = styled(Box)`
  display: flex;
  color: var(--secondary-text);
`

const FlexCenteredRightMarginBox = styled(FlexCenteredBox)`
  margin-right: 0.3rem;
`

export default JournalListViewRow
