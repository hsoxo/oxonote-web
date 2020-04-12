import React from 'react'
import {Box} from "@material-ui/core";
import {NoteAttribute, NoteSummaryObject, NoteObject} from "@/types/note";
import styled from "styled-components";
import {JournalAttribute, JournalObject, JournalView} from "@/types/journal";
import notePropTypes from "@/types/constants/note-attributes";
import { FlexCenteredBox } from "@/components/OxOUI/OxOBox";

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

type JournalListViewRowProps = {
    info: NoteSummaryObject
    viewSetting: JournalView
    jourAttrs: Array<JournalAttribute>
}

// attrId: string
// noteInfo: NoteType
// jourAttr: JournalAttribute
// noteAttr: NoteAttribute

const JournalListViewRow = ({ info: noteInfo, viewSetting , jourAttrs}: JournalListViewRowProps) => {
    const { attribute: attrSetting } = viewSetting
    const activeAttrIds = attrSetting.filter(x => x.status).map(x => x.attrId)
    let activeAttrInfo = []
    for (const attrId of activeAttrIds){
        const jourAttr = jourAttrs.find(x => x.attrId === attrId)
        const noteAttr = noteInfo.attributes.find(x => x.attrId === attrId)
        if (jourAttr && noteAttr) {
            activeAttrInfo.push({
              attrId,
              jourAttr: jourAttrs.find(x => x.attrId === attrId) as JournalAttribute,
              noteAttr: noteInfo.attributes.find(x => x.attrId === attrId) as NoteAttribute,
            })}
    }
    return (
      <JournalListViewRowBox>
        <JournalListViewRowIcon>
            {noteInfo.titleIcon || '📄'}
        </JournalListViewRowIcon>
        <JournalListViewRowTitle>
            {noteInfo.title || '未命名笔记'}
        </JournalListViewRowTitle>
        <JournalListViewRowRight>
            {activeAttrInfo.map(x =>
              <FlexCenteredRightMarginBox key={x.attrId}>
                  {notePropTypes[x.jourAttr.type].contentView({...x, noteInfo})}
              </FlexCenteredRightMarginBox>
            )}
        </JournalListViewRowRight>
      </JournalListViewRowBox>
    )
}

export default JournalListViewRow

