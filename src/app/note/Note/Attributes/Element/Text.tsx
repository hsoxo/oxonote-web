import React, {useContext, useRef, useEffect, useState} from 'react';
import {Box, BoxProps, Popover, Typography} from '@material-ui/core';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { ElementProps } from "./types";
import {usePopupState} from "material-ui-popup-state/hooks";
import {BootstrapInput} from "@/components/OxOUI/Input";
import action, {useSelector} from "@/store";
import NOTE_ACT from "@/store/note/action-declares";
import {NoteState} from "@/store/note/types";


const Text = (props: ElementProps) => {
  const { curNote: { attributes } }: NoteState = useSelector(state => state.get('note'))
  const attrIndex = attributes.findIndex(x => x.attrId === props.attrId)
  const curAttr = attributes[attrIndex]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAttributes = attributes.slice()
    newAttributes.splice(attrIndex, 1, {
      ...curAttr,
      value: e.target.value
    })
    action(NOTE_ACT.SAGA_UPDATE_NOTE, { attributes: newAttributes })
  }

  const popupState = usePopupState({
    variant: "popover",
    popupId: "attrTextValuePopup",
  });
  
  const ref = useRef<HTMLDivElement>(null);
  const [popWidth, setPopWidth] = useState(200)
  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 0;
    setPopWidth(width)
  }, [ref, setPopWidth]);
  
  return (
    <div ref={ref} style={{width: '100%'}}>
      <Box {...bindTrigger(popupState)}>
          {curAttr.value || <span style={{color: 'grey'}}>请输入描述</span>}
      </Box>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        PaperProps={{
          elevation: 2,
          style: {width: popWidth}
        }}
      >
        <BootstrapInput
          style={{width: `${popWidth}px !important`}}
          defaultValue={curAttr.value}
          autoFocus={true}
          // @ts-ignore
          onBlur={handleChange}/>
      </Popover>
    </div>
  );
};

export default Text;
