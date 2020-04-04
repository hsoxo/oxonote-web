import React, {useContext} from 'react';
import { Checkbox } from "@material-ui/core";

import { ElementProps } from "./types";
import {NoteState} from "@/store/note/types";
import action, {useSelector} from "@/store";
import NOTE_ACT from "@/store/note/action-declares";

const CheckboxElem = (props: ElementProps) => {
  const { curNote: { attributes } }: NoteState = useSelector(state => state.get('note'))
  const attrIndex = attributes.findIndex(x => x.attrId === props.attrId)
  const curAttr = attributes[attrIndex]

  const handleChange = () => {
    const newAttributes = attributes.slice()
    newAttributes.splice(attrIndex, 1, {
      ...curAttr,
      value: !curAttr.value
    })
    action(NOTE_ACT.SAGA_UPDATE_NOTE, { attributes: newAttributes })
  }
  
  return (
    <div>
      <Checkbox
        // @ts-ignore
        checked={curAttr.value}
        onChange={handleChange}
      />
    </div>
  );
};

export default CheckboxElem;
