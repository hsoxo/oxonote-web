import React from 'react'
import { Box, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import Attributes from './Attributes'
import { FlexCenteredBox, FlexBox, RightBox } from "@/components/OxOUI/OxOBox";
import action from "@/store";
import NOTE_ACT from "@/store/note/action-declares";

type JournalToolbar = {
  jourId: string
  viewId: string
}

const JournalToolbar = (props: JournalToolbar) => {

  return (
    <FlexCenteredBox>
      <FlexBox>
        {/*<Button*/}
        {/*  variant="contained"*/}
        {/*  color="primary"*/}
        {/*  size="small"*/}
        {/*  startIcon={<AddIcon />}>*/}
        {/*  New*/}
        {/*</Button>*/}
      </FlexBox>
      <RightBox>
        <Attributes />
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => action(NOTE_ACT.SAGA_CREATE_NOTE, props.jourId)}>
          新笔记
        </Button>
      </RightBox>
    </FlexCenteredBox>
  )
}

export default JournalToolbar
