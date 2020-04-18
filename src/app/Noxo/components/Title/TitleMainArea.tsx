import React from 'react'
import ContentEditable from 'react-contenteditable'
import { Box, Popover } from '@material-ui/core'
import { BaseEmoji, Picker } from 'emoji-mart'
import {
  usePopupState,
  bindToggle,
  bindPopover
} from 'material-ui-popup-state/hooks'
import {TitleBlockPropsType} from './type'
import styled from 'styled-components'

import { FlexCenteredBox } from "@/components/OxOUI/OxOBox";


const TitleIconBox = styled(Box)`
      display: flex;
      transition: background 120ms ease-in 0s;
      border-radius: 5px;
      align-items: center;
      font-size: xx-large;
      min-width: 50px;
      min-height: 53px;
      padding: 0.2rem 0.5rem;
      &:hover {
        background-color: var(--secondary-bg-hover);
      }
`

const StyledContentEditable = styled(ContentEditable)`
    padding-left: 1rem;
    display: flex;
    margin: 0.5rem 0;
    width: 100%;
    &:empty:before {
      color: #8e8e8e;
      content:"Untitled";
    }
    &:focus:before{
      content:none;
    }
`

const handleContentEditableKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
  const keyCode = e.which || e.keyCode;
  if(keyCode == 13) {
    e.preventDefault()
    return
  }
}

const TitleMainArea: React.FunctionComponent<TitleBlockPropsType> = ({title, titleIcon, onChange}) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'title-main-emoji-picker'
  })

  return (
    <FlexCenteredBox>
      {titleIcon && (
        <TitleIconBox>
          <Box {...bindToggle(popupState)}>{titleIcon}</Box>
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
              showPreview={false}
              showSkinTones={false}
              onSelect={(emoji: BaseEmoji) => {
                onChange('titleIcon', emoji.native)
                popupState.close()
              }}
            />
          </Popover>
        </TitleIconBox>
      )}
      <StyledContentEditable
        html={title}
        disabled={false}
        onKeyDown={handleContentEditableKeyPress}
        onChange={e => onChange('title', e.target.value)}
        tagName="h1" // Use a custom HTML tag (uses a div by default)
        style={{ outline: 'none', fontSize: '2.5rem' }}
      />
    </FlexCenteredBox>
  )
}

export default TitleMainArea
