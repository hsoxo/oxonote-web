import React from "react";
import {
  Box,
  Button,
  Popover,
} from "@material-ui/core";
import { Picker } from "emoji-mart";
import {
  usePopupState,
  bindToggle,
  bindPopper, bindPopover,
} from "material-ui-popup-state/hooks";
import {NoteState} from "@/store/note/types";
import action, {useSelector} from "@/store";
import NOTE_ACT from "@/store/note/action-declares";
import { BaseEmoji } from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css'
import styled from "styled-components";
import ContentEditable from "react-contenteditable";
import {TitleBlockPropsType} from "@/app/note/components/Title/types";

const TitleTopAreaWrapperBox = styled(Box)`
    display: block;
    width: 100%;
    margin-left: 0.5rem;
    opacity: 0;
    min-height: 36px;
    transition: opacity .25s ease-in-out;
    -moz-transition: opacity .25s ease-in-out;
    -webkit-transition: opacity .25s ease-in-out;
`

const InlineButtonWrapper = styled(Box)`
      display: inline-block;
`

const TitleTopAera: React.FunctionComponent<TitleBlockPropsType> = (props) => {
  const state: NoteState = useSelector(state => state.get('note'))

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'title-top-emoji-picker'
  })

  const curType = props.type === 'journal' ? state.curJournal : state.curNote
  const { titleIcon } = curType

  return (
    <TitleTopAreaWrapperBox id="title-top-area">
      {titleIcon ? (
        <InlineButtonWrapper>
          <Button
              color="primary"
              {...bindToggle(popupState)}
              onClick={() => action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { titleIcon: '' })}
          >
            删除 Emoji
          </Button>
        </InlineButtonWrapper>
      ) : (
        <InlineButtonWrapper>
          <Button color="primary" {...bindToggle(popupState)}>
            添加一个Emoji
          </Button>
          <Popover
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            {...bindPopover(popupState)}>
            <Picker
              native={true}
              title="Pick your emoji..."
              onSelect={(emoji: BaseEmoji) => {
                action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { titleIcon: emoji.native })
                popupState.close()
              }}
            />
          </Popover>
        </InlineButtonWrapper>
      )}
      {/*{description || <Button color="primary">添加一段描述</Button>}*/}
    </TitleTopAreaWrapperBox>
  )
};

export default TitleTopAera;
