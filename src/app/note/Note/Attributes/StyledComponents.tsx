import React from "react";
import styled from "styled-components";
import {Box, Popover, Grid} from "@material-ui/core";

export const AttributeRowWrapper = styled(Grid)`
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
`

export const HoverGrid = styled(Grid)`
    transition: background 120ms ease-in 0s;
    border-radius: 0.2rem;
    &:hover {
      background-color: var(--secondary-bg-hover);
    }
`

export const AttributeNameWrapper = styled(Box)`
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 180px;
    padding: 0 0.8rem;
    height: 34px;
    color: var(--secondary-text);
    text-overflow: ellipsis;
    text-transform: none;
    text-align: left;
`

export const AttributeName = styled(Box)`
      display: flex;
      align-items: center;
      line-height: 120%;
      min-width: 180px;
      text-overflow: ellipsis;
`

export const AttributeLabel = styled(Box)`
      margin-top: 2px;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      overflow: hidden;
`

export const AttributeIcon = styled(Box)`
      display: flex;
      font-size: 1.2rem;
      padding-right: 0.2rem;
`

export const AttributeValueWrapper = styled(Box)`
    display: flex;
    width: 100%;
    align-items: center;
    margin-left: 4px;
    flex: 1 1 auto;
    height: 34px;
`

export const AttributeValue = styled(Box)`
      display: flex;
      align-items: center;
      line-height: 120%;
      min-width: 100%;
`

export const AttributeTitlePopover = styled(Popover)`
  min-width: 200px;
  box-shadow: rgba(15, 15, 15, 0.05) 0 0 1px, rgba(15, 15, 15, 0.1) 0 3px 6px,
    rgba(15, 15, 15, 0.2) 0 9px 24px;
`
