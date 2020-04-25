import React, {FocusEvent, FunctionComponent, Fragment, useState} from 'react'
import { MarginDivider5 } from '@/components/OxOUI/Divider'
import { DenseListItem, DenseListItemIcon } from '@/components/OxOUI/List'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import AttributeTypePicker from './AttributeTypePicker'
import styled from 'styled-components'
import { BootstrapInput } from '@/components/OxOUI/Input'
import sagaAction from "@/store";
import * as NOTE_ACT from "@/store/note/actions";

const handleLabelChange = (attrId: string, newTitle: string) => {
  sagaAction({ type: NOTE_ACT.SAGA_UPDATE_ATTRIBUTE_TITLE, attrId, newTitle })
}

interface AttributeTypeEditorProps {
  label: string
  onLabelChange: (label: string) => void
  onTypeChange: (label: string) => void
  onDelete?: () => void
}
const AttributeTypeEditor: FunctionComponent<AttributeTypeEditorProps> = ({
  label,
  onLabelChange,
  onTypeChange,
  onDelete,
}) => {
  return (
    <div>
      <InfileBootstrapInput
        defaultValue={label}
        onBlur={(e: FocusEvent<HTMLInputElement>) => {
          if (e.target.value !== label)
            onLabelChange(e.target.value)
        }}
      />
      <MarginDivider5 />
      <AttributeTypePicker onTypeChange={onTypeChange} />
      {onDelete && (
        <Fragment>
          <MarginDivider5 />
          <DenseListItem button={true} onClick={onDelete}>
            <DenseListItemIcon>
              <HighlightOffIcon fontSize="inherit" />
            </DenseListItemIcon>
            {'删除属性'}
          </DenseListItem>
        </Fragment>
      )}
      <div style={{ height: '0.3rem' }} />
    </div>
  )
}

const InfileBootstrapInput = styled(BootstrapInput)`
  padding-bottom: 0.2rem;
`
export default AttributeTypeEditor
