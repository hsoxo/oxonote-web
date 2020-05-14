import React from 'react'
import {ElementProps} from './types'
import BaseElement, {ContentViewProps} from './Base'

export const ModifiedByContent = ({ noteInfo }: ContentViewProps) => {
  return noteInfo.modifiedUser
}

export const ModifiedByContentView: React.FunctionComponent<ContentViewProps> = ({
  noteInfo
}) => {
  return <div>{noteInfo.modifiedUser}</div>
}

const ModifiedByAttributeBody = (props: ElementProps) => {
  return (
    <BaseElement {...props} editable={false} display={ModifiedByContentView} />
  )
}

export default ModifiedByAttributeBody
