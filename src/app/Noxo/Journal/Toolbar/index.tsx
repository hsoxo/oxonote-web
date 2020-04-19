import React from 'react'
import { FlexCenteredBox, FlexBox, RightBox } from "@/components/OxOUI/OxOBox";
import ViewsManager from "./Views";
import AttributeSetting from "./Attributes";
import FilterSetting from "@/app/Noxo/Journal/Toolbar/Filters";
import SortSetting from "@/app/Noxo/Journal/Toolbar/Sorts";
import NewNote from "./NewNote";

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
