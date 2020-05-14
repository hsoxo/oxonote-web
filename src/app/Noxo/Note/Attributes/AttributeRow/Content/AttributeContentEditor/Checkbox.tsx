import React from 'react'
import {ElementProps} from './types'
import BaseElement, {ContentViewProps} from './Base'
import {Checkbox} from '@material-ui/core'

export const CheckboxContent = ({ noteAttr }: ContentViewProps) => {
  return noteAttr.value
}

export const CheckboxContentView: React.FunctionComponent<ContentViewProps> = ({
  noteAttr
}) => {
  return <Checkbox checked={noteAttr.value as boolean} />
}

const CheckboxAttributeBody = (props: ElementProps) => {
  return (
    <BaseElement
      {...props}
      editable={true}
      display={CheckboxContentView}
      isToggle={true}
    />
  )
}

export default CheckboxAttributeBody
