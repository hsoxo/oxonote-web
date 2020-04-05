import React from 'react'
import { ElementProps } from './types'
import BaseElement, {
  ContentPopoverProps,
  ContentViewProps
} from './Base'
import {Checkbox} from "@material-ui/core";

export const CheckboxContentView: React.FunctionComponent<ContentViewProps> = ({
  noteAttr
}) => {
  return (
    <Checkbox checked={noteAttr.value as boolean}/>
  )
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
