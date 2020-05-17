import React from 'react'
import { Box, Button, Popover } from '@material-ui/core'
import { BaseEmoji, Picker } from 'emoji-mart'
import {
  bindPopover,
  bindToggle,
  usePopupState
} from 'material-ui-popup-state/hooks'
import 'emoji-mart/css/emoji-mart.css'
import styled from 'styled-components'
import { TitleBlockPropsType } from '@/app/Noxo/components/Title/type'

const TitleTopAreaWrapperBox = styled(Box)`
  display: block;
  width: 100%;
  margin-left: 0.5rem;
  opacity: 0;
  min-height: 36px;
  transition: opacity 0.25s ease-in-out;
  -moz-transition: opacity 0.25s ease-in-out;
  -webkit-transition: opacity 0.25s ease-in-out;
`

const InlineButtonWrapper = styled(Box)`
  display: inline-block;
`

const TitleTopArea: React.FunctionComponent<TitleBlockPropsType> = ({
  titleIcon,
  onChange
}) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'title-emoji-picker'
  })

  return (
    <TitleTopAreaWrapperBox id="title-top-area">
      {titleIcon ? (
        <InlineButtonWrapper>
          <Button
            color="primary"
            {...bindToggle(popupState)}
            onClick={() => onChange('titleIcon', '')}
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
            {...bindPopover(popupState)}
          >
            <Picker
              native={true}
              title="Pick your emoji..."
              onSelect={(emoji: BaseEmoji) => {
                onChange('titleIcon', emoji.native)
                popupState.close()
              }}
            />
          </Popover>
        </InlineButtonWrapper>
      )}
      {/*{description || <Button color="primary">添加一段描述</Button>}*/}
    </TitleTopAreaWrapperBox>
  )
}

export default TitleTopArea
