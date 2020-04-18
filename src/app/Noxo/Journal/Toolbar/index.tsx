import React from 'react'
import { Box, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { FlexCenteredBox, FlexBox, RightBox } from "@/components/OxOUI/OxOBox";
import action, {useSelector} from "@/store";
import NOTE_ACT from "@/store/note/actions";
import ViewsManager from "./Views";
import AttributeSetting from "./Attributes";
import FilterSetting from "@/app/Noxo/Journal/Toolbar/Filters";
import SortSetting from "@/app/Noxo/Journal/Toolbar/Sorts";
import NewNote from "./NewNote";
import {NoteState} from "@/types/states";

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
        <NewNote />
      </RightBox>
    </FlexCenteredBox>
  )
}

export default JournalToolbar
