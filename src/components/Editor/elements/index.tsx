// @ts-nocheck
import React from 'react'

import elementsTypes from "./HtmlElementWrapper";

import Leaf from "./Leaf";

import clsx from "clsx";
import ToolWrapper from "../toolbar/Wrapper";
import { useSelected, useFocused } from "slate-react";
import styled from "styled-components";

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

const elementsMap = Object.fromEntries(elementsTypes.map(x => [x.type, x]))

const ElementBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  &:hover > #element-toolbar {
    transition: all ease 500ms;
    opacity: 1;
  }
`

const StyledToolWrapper = styled.div`
  opacity: 0;
  display: flex;
`

const ElmtWrapper = styled.div`
  width: 100%;
  padding: 0.3rem 0.5rem;
  transition: all ease 500ms;
  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }
  &:hover {
    box-shadow: 0px 2px 10px -1px rgba(0,0,0,0.05);
  }
`

export const ElementWrapper: React.FunctionComponent<EditorElementProps> = (props) => {
  const handleDeselect = () => {
  };

  const { element, editor, children, Tool, isSelected } = props;

  const Elmt = (elementsMap[element.type] || {}).elem || element['default'].elem
  return (
    <ElementBox>
      <StyledToolWrapper id="element-toolbar">
        <ToolWrapper onClick={handleDeselect}/>
      </StyledToolWrapper>
      <ElmtWrapper>
        <Elmt {...props}>
          {children}
        </Elmt>
      </ElmtWrapper>
    </ElementBox>
  );
}


export default ElementWrapper

