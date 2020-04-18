import React, {useContext} from 'react'
import { v4 as uuid } from "uuid";
import {NoteState} from "@/types/states";
import {useSelector} from "@/store";
import { Box } from "@material-ui/core";

import AttributeRow from "./components/AttributeRow";
import AttributeTitle from "./components/AttributeTitle";
import AttributeContent from "./components/AttributeContent";
import AddNew from "./components/AddNew"

import styled from "styled-components";

const AttributeBlockBox = styled(Box)`
  margin: 0.5rem 1rem;
`

const AttributeBlock = () => {
  const { curJournal: { jourAttrs }, curNote }: NoteState = useSelector(state => state.get('note'))
  const attributes = curNote.attributes.filter(x =>
    jourAttrs.some(y => x.attrId === y.attrId)
  )
  
  return (
    <AttributeBlockBox>
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
    </AttributeBlockBox>
  )
}

export default AttributeBlock