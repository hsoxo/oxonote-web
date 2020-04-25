import React from 'react'
import { FlexCenteredBox, FlexBox, RightBox } from "@/components/OxOUI/OxOBox";
import ViewsManager from "./Views";
import AttributeSetting from "./Attributes";
import FilterSetting from "@/app/Noxo/Journal/Toolbar/Filters";
import SortSetting from "@/app/Noxo/Journal/Toolbar/Sorts";
import NewNote from "./NewNote";



const JournalToolbar = () => {
  return (
    <FlexCenteredBox>
      <FlexBox>
        <ViewsManager />
      </FlexBox>
      <RightBox>
        <AttributeSetting />
        {/*<FilterSetting />*/}
        {/*<SortSetting />*/}
        <NewNote />
      </RightBox>
    </FlexCenteredBox>
  )
}

export default JournalToolbar
