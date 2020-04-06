import styled from "styled-components";
import {MenuItem, Select} from "@material-ui/core";

export const DenseSelect = styled(Select).attrs({
  classes: { root: 'root' }
})`
  margin-right: 10px;
  .root {
    padding: 3px 20px 3px 5px;
    font-size: 0.9rem;
    border-color: var(--inline-bg);
    color: var(--primary-text);
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
  & .MuiSelect-iconOutlined {
    right: 0;
  }
`

export const DenseSelectItem = styled(MenuItem)`
  && {
    height: 1.8rem;
    font-size: 0.9rem;
    color: var(--primary-text);
  }
`