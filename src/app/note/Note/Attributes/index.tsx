import React, {useContext} from 'react'
import { v4 as uuid } from "uuid";
import AddNew from "./AddNew"
import {NoteState} from "@/store/note/types";
import {useSelector} from "@/store";
import { Box } from "@material-ui/core";

import AttributeRow from "./AttributeRow";
import AttributeTitle from "./AttributeTitle";
import AttributeContent from "./AttributeContent";

const AttributeBlock = () => {
  const { curNote }: NoteState = useSelector(state => state.get('note'))
  const attributes = curNote.attributes
  
  return (
    <Box>
      <React.Fragment>
        {attributes.map(value => 
          <AttributeRow 
            key={value.attrId}
            title={<AttributeTitle {...value}/>}
            content={<AttributeContent {...value}/>}
          />)}
      </React.Fragment>
      <AttributeRow
        title={<AddNew />}
      />
    </Box>
  )
}

export default AttributeBlock