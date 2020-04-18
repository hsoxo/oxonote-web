import React from "react";
import styled from "styled-components";
import { InputBase } from "@material-ui/core";

export const BootstrapInput = styled(InputBase)`
  width: 100%;
  padding: 0.5rem;;
  label + & {
    margin-top: 0.5rem;
  }
  input {
    border-radius: 4px;
    position: relative;
    background-color: white;
    border: 1px solid #ced4da;
    font-size: 16px;
    width: 100%;
    padding: 3px 8px;
    transition: all ease 300ms;
    &:focus {
      box-shadow: var(--primary-color-light) 0 0 0 0.2rem;
      border-color: var(--primary-color);
    };
  }
`

export const NoBorderInput = styled(InputBase)`
  width: 100%;
  background-color: var(--mu-bg);
  label + & {
    margin-top: 0.5rem;
  }
  input {
    position: relative;
    background-color: var(--mu-bg);
    font-size: 16px;
    width: 100%;
    padding: 0.5rem;
    transition: all ease 300ms;
  }
`