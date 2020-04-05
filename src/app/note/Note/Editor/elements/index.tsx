// @ts-nocheck

import React from 'react'

import {
  BlockQuoteElement,
  BulletListElement,
  CodeElement,
  DefaultElement, HeadFiveElement, HeadFourElement,
  HeadOneElement, HeadSixElement, HeadThreeElement, HeadTwoElement,
  ListElement
} from "./HtmlElementWrapper";


import Leaf from "./Leaf";
interface EditorElementProps {
  children: any
  attributes: any
  element: any
  Tool: any
  isSelected: boolean
  editor: any
}

export const ElementRoot: React.FunctionComponent<EditorElementProps> = (props) => {
  const { attributes, children } = props
  return (
    <ElementWrapper {...props}>
      {children}
    </ElementWrapper>
  )
}

export { Leaf }

export const elementsTypes = [
  {
    type: 'default',
    elem: DefaultElement,
    shortcut: null,
  },
  {
    type: 'paragraph',
    elem: DefaultElement,
    shortcut: null,
  },
  {
    type: 'bulleted-list',
    elem: BulletListElement,
    shortcut: '-',
  },
  {
    type: 'code',
    elem: CodeElement,
    shortcut: '```',
  },
  {
    type: 'orderedList',
    elem: ListElement,
    shortcut: '1.',
  },
  {
    type: 'block-quote',
    elem: BlockQuoteElement,
    shortcut: '>',
  },
  {
    type: 'heading-one',
    elem: HeadOneElement,
    shortcut: '#',
  },
  {
    type: 'heading-two',
    elem: HeadTwoElement,
    shortcut: '##',
  },
  {
    type: 'heading-three',
    elem: HeadThreeElement,
    shortcut: '###',
  },
  {
    type: 'heading-four',
    elem: HeadFourElement,
    shortcut: '####',
  },
  {
    type: 'heading-five',
    elem: HeadFiveElement,
    shortcut: '#####',
  },
  {
    type: 'heading-six',
    elem: HeadSixElement,
    shortcut: '######',
  },
]


import clsx from "clsx";
import ToolWrapper from "../toolbar/Wrapper";
import { useSelected, useFocused } from "slate-react";

const elementsMap = Object.fromEntries(elementsTypes.map(x => [x.type, x]))

export const ElementWrapper: React.FunctionComponent<EditorElementProps> = (props) => {
  const myRef = React.createRef();
  const selected = useSelected()
  const focused = useFocused()
  const handleClick = (e: React.ChangeEvent) => {
    // e.stopPropagation();
    // const { element, onChangeData, editor } = props;
    // const toolbar = document.querySelector('.tool-wrapper');
    // const isInPlugin = toolbar && toolbar.contains(e.target);
  };


  const handleDeselect = () => {
    // const { onChangeData, element } = props;
    // onChangeData(d => d.setIn([element.key, 'isSelected'], false));
  };

  const { element, editor, children, Tool, isSelected } = props;
  // if (isIgnoreWrapper(element.type)) {
  //   return children;
  // }

  const Elmt = (elementsMap[element.type] || {}).elem || element['default'].elem
  return (
    // <div onClick={handleClick}
    <div
      className={clsx(`element-wrapper element-wrapper-${element.type}`, {
        'element-active': selected && focused
      })}
    >
      <Elmt {...props}>
        {children}
      </Elmt>
      <ToolWrapper onClick={handleDeselect}>
        {/*<Tool Editor={Editor} element={element} />*/}
      </ToolWrapper>
      {isSelected && Tool && (
        <ToolWrapper onClick={handleDeselect}>
          <Tool editor={editor} element={element} />
        </ToolWrapper>
      )}
    </div>
  );
}


export default ElementWrapper

