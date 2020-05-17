import React, { useEffect, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import { Box, Popover } from '@material-ui/core'
import { BaseEmoji, Picker } from 'emoji-mart'
import {
  bindPopover,
  bindToggle,
  usePopupState
} from 'material-ui-popup-state/hooks'
import { TitleBlockPropsType } from './type'
import styled from 'styled-components'

import { FlexCenteredBox } from '@/components/OxOUI/OxOBox'

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
  outline: none;
  font-size: 2.5rem;
  line-height: 3rem;
  &:empty:before {
    color: #8e8e8e;
    content: 'Untitled';
  }
  &:focus:before {
    content: none;
  }
`

const handleContentEditableKeyPress = (
  e: React.KeyboardEvent<HTMLDivElement>
) => {
  const keyCode = e.which || e.keyCode
  if (keyCode == 13) {
    e.preventDefault()
    return
  }
}

const TitleMainArea: React.FunctionComponent<TitleBlockPropsType> = ({
  title,
  titleIcon,
  onChange
}) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'title-main-emoji-picker'
  })
  const [content, setContent] = useState('')

  const handleChange = () => {
    const el = document.getElementById('titleContent')
    const text = el ? el.innerText : ''
    setContent(text)
    onChange('title', text)
  }

  useEffect(() => {
    setContent(title)
  }, [title, setContent])

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
            {...bindPopover(popupState)}
          >
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
        id={'titleContent'}
        html={content}
        disabled={false}
        onKeyDown={handleContentEditableKeyPress}
        onChange={handleChange}
        tagName="h1" // Use a custom HTML tag (uses a div by default)
      />
    </FlexCenteredBox>
  )
}

export default TitleMainArea
