import React from "react";
import notePropTypes from "@/types/constants/note-attributes";
import {NoteState} from "@/types/states";
import {useSelector} from "@/store";
import {NoteAttribute} from "@/types/note";
import { AttributeValueWrapper, AttributeValue } from "./UI";

const AttributeContent: React.FunctionComponent<NoteAttribute> = props =>  {
  const { curJournal: { jourAttrs } }: NoteState = useSelector(state => state.get('note'))
  const { type } = jourAttrs[jourAttrs.findIndex(x => x.attrId === props.attrId)]
  const attrInfo = notePropTypes[type]

  return (
    <AttributeValueWrapper>
      <AttributeValue>
        {React.createElement(attrInfo.elem, props)}
      </AttributeValue>
    </AttributeValueWrapper>
  )
};


export default React.memo(AttributeContent)