import BlockQuoteElement from './BlockQuote'
import * as L from './Lists'
import CodeElement from './Code'
import * as H from './Header'


import * as NAMES from '../constants/names'
import ParagraphElement from './Paragraph'
import React, {useEffect, useRef} from 'react'
import {EditorElementProps} from '../types'
import styled from 'styled-components'
import {Node, Point} from 'slate'

export const BlockSetting = {
  [NAMES.PARAGRAPH]: ParagraphElement,
  [NAMES.H1]: H.HeadOneElement,
  [NAMES.H2]: H.HeadTwoElement,
  [NAMES.H3]: H.HeadThreeElement,
  [NAMES.H4]: H.HeadFourElement,
  [NAMES.H5]: H.HeadFiveElement,
  [NAMES.H6]: H.HeadSixElement,
  [NAMES.CODE]: CodeElement,
  [NAMES.BULLET_LIST]: L.BulletListElement,
  [NAMES.ORDERED_LIST]: L.OrderedListElement,
  [NAMES.LIST_ITEM]: L.ListItemElement,
  [NAMES.BLOCKQUOTE]: BlockQuoteElement,
}

export const ShortNames = {
  [NAMES.PARAGRAPH]: '段',
  [NAMES.H1]: 'H1',
  [NAMES.H2]: 'H2',
  [NAMES.H3]: 'H3',
  [NAMES.H4]: 'H4',
  [NAMES.H5]: 'H5',
  [NAMES.H6]: 'H6',
  [NAMES.CODE]: '码',
  [NAMES.BULLET_LIST]: 'LB',
  [NAMES.ORDERED_LIST]: 'LO',
  [NAMES.LIST_ITEM]: 'LI',
  [NAMES.BLOCKQUOTE]: 'BQ',
}

const isEmpty = (element: Node) => {
  if (element.children.length === 0 && element.children[0].text.length === 0) {
    return true
  } else {
    return false
  }
}

const Element: React.FunctionComponent<EditorElementProps> = (props) => {
  const {
    editor,
    attributes,
    children,
    element,
  } = props
  const ref = useRef()
  const elementType = element.type || NAMES.PARAGRAPH
  // @ts-ignore
  const ElementRenderer = BlockSetting[elementType]
  // @ts-ignore
  const elementLabel = ShortNames[elementType]


  const { selection } = editor
  let selected = false
  const { anchor } = selection || {} as Point
  if (selection !== null && anchor) {
    selected = editor.children[anchor.path[0]] === element
  }

  useEffect(() => {
    const el = ref.current
    const { selection } = editor
    if (!el) {
      return
    }
  }, [ref])

  if (ElementRenderer) {
    return (
      <Wrapper active={selected} label={elementLabel}>
        <ElementRenderer
          className={isEmpty(element) && 'empty'}
          editor={editor}
          element={element}
          {...attributes}>
          {children}
        </ElementRenderer>
      </Wrapper>
    )
  } else if (element.type === NAMES.INLINE_LINK) {
    return (
      <div {...attributes} style={{display: "inline-block"}}>
        <button onClick={() => window.open(element.href, '_blank')}>
          {children}
        </button>
      </div>
    )
  } else if (element.type === NAMES.IMAGE) {
    return (
      <Wrapper active={selected} label="图">
        <div {...attributes}>
          <div contentEditable="false" suppressContentEditableWarning={true}>
            <img src={element.src} style={{display: "block", maxWidth: "90%", maxHeight: "20em", boxShadow: "0 0 0 3px #B4D5FF"}}/>
          </div>
          <div style={{display: 'none'}}>
            {children}
          </div>
        </div>
      </Wrapper>
    )
  }
  return (
    <Wrapper active={selected} label={'段'}>
      <ParagraphElement className={isEmpty(element) && 'empty'} element={element} {...attributes}>{children}</ParagraphElement>
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
  #oxo-element #left-icon {
    display: none;
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
  p span[data-slate-length="0"] {
    &:before {
      color: #8e8e8e;
      content:"请点击此处输入";
      position: relative;
    }
  }
  ${p =>
    p.active && `
    box-shadow: 0px 3px 14px 2px rgba(0,0,0,0.12);
    p span[data-slate-length="0"] {
      &:before {
        content: none;
      }
    }
    `};
  
`

interface WrapperProps {
  active: boolean
  label: any
}

const Wrapper: React.FunctionComponent<WrapperProps> = ({active, label, children}) => {
  return (
    <WrapperBox>
      <SideIconBox suppressContentEditableWarning={true} id="left-icon" contentEditable={"false"} active={active}>
        <div style={{display:"block",width:'100%',textAlign:"center"}}>
          {label}
        </div>
      </SideIconBox>
      <ElementBox id="oxo-element" active={active}>{children}</ElementBox>
    </WrapperBox>
  )
}

export default Element
