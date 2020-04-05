import React from 'react'
import { Box, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { FlexCenteredBox, FlexBox, RightBox } from "@/components/OxOUI/OxOBox";
import action, {useSelector} from "@/store";
import NOTE_ACT from "@/store/note/action-declares";
import ViewsManager from "./Views";
import AttributeSetting from "./Attributes";
import FilterSetting from "@/app/note/Journal/Toolbar/Filters";
import SortSetting from "@/app/note/Journal/Toolbar/Sorts";
import {NoteState} from "@/store/note/types";

type JournalToolbar = {
  jourId: string
  viewId: string
}

const JournalToolbar = (props: JournalToolbar) => {
  
  return (
    <FlexCenteredBox>
      <FlexBox>
        <ViewsManager {...props}/>
      </FlexBox>
      <RightBox>
        <AttributeSetting {...props}/>
        <FilterSetting {...props}/>
        <SortSetting {...props}/>
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
