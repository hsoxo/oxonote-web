import React from "react";
import styled from "styled-components";
import { InputBase } from "@material-ui/core";

export const BootstrapInput = styled(InputBase)`
  width: 100%;
  padding: 0.5rem;
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
      box-shadow: 0 0 0 0.2rem;
      border-color: var(--primary-color);
    };
  
  }
`