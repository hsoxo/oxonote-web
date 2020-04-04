import React from 'react'
import {Box} from "@material-ui/core";
import {NoteShortType} from "@/types/note";
import styled from "styled-components";

const JournalListViewRowBox = styled(Box)`
    display: flex;
    padding: 0.3rem 1rem;
    transition: background 180ms ease-in 0s;
    border-radius: 5px;
    height: 2rem;
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
      border-bottom: 1px solid var(--primary-text);
      &:hover {
        cursor: pointer;
        border-bottom: 2px solid var(--primary-text);
      }
`

const JournalListViewRowProps = styled(Box)`
      display: flex;
      color: var(--secondary-text);
`

type JournalListViewRowProps = {
    info: NoteShortType
}

const JournalListViewRow = ({ info }: JournalListViewRowProps) => {
    return (
      <JournalListViewRowBox>
        <JournalListViewRowIcon>
            {info.titleIcon || '📄'}
        </JournalListViewRowIcon>
        <JournalListViewRowTitle>
            {info.title || 'Untitled Note'}
        </JournalListViewRowTitle>
        <JournalListViewRowProps>
            {info.title}
        </JournalListViewRowProps>
      </JournalListViewRowBox>
    )
}

export default JournalListViewRow

