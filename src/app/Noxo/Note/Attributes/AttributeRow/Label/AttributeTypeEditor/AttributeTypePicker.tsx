import React, {FunctionComponent} from 'react';
import {DenseListItem, DenseListItemHeader, DenseListItemIcon} from "@/components/OxOUI/List";
import notePropTypes from "@/types/constants/note-attributes";

interface AttributeTypePickerProps {
  onTypeChange: (typeKey: string) => void
}

const AttributeTypePicker: FunctionComponent<AttributeTypePickerProps> = (props) => {
  return (
    <div>
      <DenseListItemHeader>
        {"选择属性类型"}
      </DenseListItemHeader>
      {Object.entries(notePropTypes).map(([k, v]) =>
        k !== '0' ?
          <DenseListItem key={k} button={true} onClick={() => props.onTypeChange(k)}>
            <DenseListItemIcon>
              {v.icon}
            </DenseListItemIcon>
            {v.defaultLabel}
          </DenseListItem>
          :
          <></>
      )}
    </div>
  );
};

export default AttributeTypePicker