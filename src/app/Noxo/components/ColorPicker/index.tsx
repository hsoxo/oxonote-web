import React, {FunctionComponent} from 'react';
import {DenseListItem, DenseListItemHeader, DenseListItemIcon} from "@/components/OxOUI/List";
import {color100} from "@/types/constants/colors";
import {Box} from "@material-ui/core";
import styled from "styled-components";

interface ColorPickerProps {
  onChange: (color: string) => void
}

const ColorPicker: FunctionComponent<ColorPickerProps> = (props) => {
  return (
    <div>
      <DenseListItemHeader>
        {"选择颜色"}
      </DenseListItemHeader>
      {color100.map((item) =>
        <DenseListItem key={item.value} button={true} onClick={() => props.onChange(item.value)}>
          <InfileColorBox color={item.value}/>
          {item.colorEn}
        </DenseListItem>
      )}
    </div>
  );
};

const InfileColorBox = styled.div`
  background-color: ${p => p.color};
  width: 1rem;
  height: 1rem;
  border-radius: 0.2rem;
  margin-right: 0.3rem;
`

export default ColorPicker;