import React from 'react';
import toc from "@/app/Noxo/Note/TableOfContent/tocFormatter";
import styled from "styled-components";

const TableOfContent: React.FC<{ noteContent: any }> = ({noteContent}) => {

  return (
    <StyledToC dangerouslySetInnerHTML={{ __html: toc(noteContent) }} />
  );
};

const StyledToC = styled.div`
  font-weight: 600;
  padding-left: 0;
  position: relative;
  font-size: 15px;
  & > li > a {
    position: relative;
    line-height: 20px;
    @include catalogRound(0, 6px);
  }
  ul, li {
    padding: 0;
    margin: 2px 0.8rem;
  }
  ul > li > a {
    font-size: 14px;
    color: #333333;
    font-weight: 500;
    position: relative;
    @include catalogRound(20px, 5px);
  }
  ul > ul > li > a {
    line-height: 20px;
    font-size: 14px;
    color: #333333;
    font-weight: normal;
    @include catalogRound;
  }
  a {
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export default TableOfContent;