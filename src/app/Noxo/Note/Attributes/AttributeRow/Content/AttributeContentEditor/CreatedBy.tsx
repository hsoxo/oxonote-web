import React from 'react'
import {ElementProps} from './types'
import BaseElement, {ContentViewProps} from './Base'

export const CreatedByContent = ({ noteInfo }: ContentViewProps) => {
  return noteInfo.createdUser
}

export const CreatedByContentView: React.FunctionComponent<ContentViewProps> = ({
  noteInfo
}) => {
  return <div>{noteInfo.createdUser}</div>
}

const CreatedByAttributeBody = (props: ElementProps) => {
  return (
    <BaseElement {...props} editable={false} display={CreatedByContentView} />
  )
}

export default CreatedByAttributeBody
