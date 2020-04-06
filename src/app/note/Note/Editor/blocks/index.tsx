import BlockQuoteElement from './BlockQuote'
import BulletListElement from './BulletList'
import NumberedListElement from './NumberedList'
import OrderedList from './OrderedList'
import CodeElement from './Code'
import HeadOneElement from './HeaderOne'
import HeadTwoElement from './HeaderTwo'
import HeadThreeElement from './HeaderThree'
import HeadFourElement from './HeaderFour'
import HeadFiveElement from './HeaderFive'
import HeadSixElement from './HeaderSix'

import * as NAMES from '../constants/block'
import * as PATTERN from '../constants/md-block-pattern'
import ParagraphElement from '@/app/note/Note/Editor/blocks/Paragraph'
import React from 'react'
import { EditorElementProps } from '@/app/note/Note/Editor/types'
import styled from 'styled-components'
import { Editor } from 'slate'

export const BlockSetting = {
  [NAMES.PARAGRAPH]: {
    shortName: 'P',
    element: ParagraphElement,
    pattern: null
  },
  [NAMES.BLOCK_QUOTE]: {
    shortName: 'Q',
    element: BlockQuoteElement,
    pattern: PATTERN.BLOCK_QUOTE
  },
  [NAMES.BULLET_LIST]: {
    shortName: 'BL',
    element: BulletListElement,
    pattern: PATTERN.BULLET_LIST
  },
  [NAMES.ORDERED_LIST]: {
    shortName: 'OL',
    element: NumberedListElement,
    pattern: PATTERN.ORDERED_LIST
  },
  [NAMES.CODE]: {
    shortName: 'C',
    element: CodeElement,
    pattern: PATTERN.CODE
  },
  [NAMES.H1]: {
    shortName: 'H1',
    element: HeadOneElement,
    pattern: PATTERN.H1
  },
  [NAMES.H2]: {
    shortName: 'H2',
    element: HeadTwoElement,
    pattern: PATTERN.H2
  },
  [NAMES.H3]: {
    shortName: 'H3',
    element: HeadThreeElement,
    pattern: PATTERN.H3
  },
  [NAMES.H4]: {
    shortName: 'H4',
    element: HeadFourElement,
    pattern: PATTERN.H4
  },
  [NAMES.H5]: {
    shortName: 'H5',
    element: HeadFiveElement,
    pattern: PATTERN.H5
  },
  [NAMES.H6]: {
    shortName: 'H6',
    element: HeadSixElement,
    pattern: PATTERN.H6
  }
}

const Element: React.FunctionComponent<EditorElementProps> = ({
  editor,
  attributes,
  children,
  element
}) => {
  // @ts-ignore
  const elemSetting = BlockSetting[element.type]
  const { selection } = editor
  let selected = false
  if (selection !== null && selection.anchor !== null) {
    selected = editor.children[selection.anchor.path[0]] === element
  }

  if (elemSetting) {
    return (
      <Wrapper active={selected} elemSetting={elemSetting}>
        <elemSetting.element {...attributes}>{children}</elemSetting.element>
      </Wrapper>
    )
  }
  return (
    <Wrapper active={selected} elemSetting={BlockSetting[NAMES.PARAGRAPH]}>
      <ParagraphElement {...attributes}>{children}</ParagraphElement>
    </Wrapper>
  )
}

const WrapperBox = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;
  &:hover #left-icon {
    opacity: 1;
  }
`
const SideIconBox = styled.div<ActiveDivProps>`
  display: flex;
  user-select: none;
  background-color: var(--secondary-bg);
  color: var(--secondary-bg-hover);
  min-width: 1.5rem;
  min-height: 1.5rem;
  border-radius: 5px;
  text-align: center;
  align-items: center;
  margin-right: 0.5rem !important;
  opacity: ${p => p.active ? '1' : '0'};
  transition: all ease 200ms;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.67, 0.51);
`

interface ActiveDivProps {
  active: boolean
}
const ElementBox = styled.div<ActiveDivProps>`
  display: flex;
  width: 100%;
  border-radius: 5px;
  padding: .6rem;
  ${p =>
    p.active && `
    box-shadow: 0px 3px 14px 2px rgba(0,0,0,0.12);
    `};
`

interface WrapperProps {
  active: boolean
  elemSetting: any
}

const Wrapper: React.FunctionComponent<WrapperProps> = ({active, elemSetting, children}) => {
  return (
    <WrapperBox>
      <SideIconBox suppressContentEditableWarning={true} id="left-icon" contentEditable={"false"} active={active}>
        <div style={{display:"block",width:'100%',textAlign:"center"}}>
          {elemSetting.shortName}
        </div>
      </SideIconBox>
      <ElementBox active={active}>{children}</ElementBox>
    </WrapperBox>
  )
}

export default Element
