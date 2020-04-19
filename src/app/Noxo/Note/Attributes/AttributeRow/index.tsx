import React from 'react'
import AttributeContent from './Content'
import AttributeLabel from "./Label";
import CreateNew from './Label/CreateNew'
import { HoverGrid } from "../StyledComponents";
import styled from "styled-components";
import {Grid} from "@material-ui/core";
import {NoteAttribute} from "@/types/note";


const AttributeRow: React.FunctionComponent<NoteAttribute>  = (props) => {
  return (
    <AttributeRowWrapper container>
      <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
        <AttributeLabel {...props} />
      </Grid>
      <HoverGrid item xs={12} sm={8} md={8} lg={10} xl={10}>
        <AttributeContent {...props} />
      </HoverGrid>
    </AttributeRowWrapper>
  )
}

export const AttributeNewRow: React.FunctionComponent  = (props) => {
  return (
    <AttributeRowWrapper container>
      <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
        <CreateNew />
      </Grid>
    </AttributeRowWrapper>
  )
}

const AttributeRowWrapper = styled(Grid)`
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
`

export default AttributeRow