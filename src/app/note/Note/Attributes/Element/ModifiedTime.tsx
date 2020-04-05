import React from 'react'
import { ElementProps } from './types'
import BaseElement, { ContentViewProps } from './Base'

export const ModifiedTimeContentView: React.FunctionComponent<ContentViewProps> = ({
                                                                             noteInfo
                                                                           }) => {
  return <div>{new Date(noteInfo.modifiedTime).toLocaleString()}</div>
}

const ModifiedTimeAttributeBody = (props: ElementProps) => {
  return (
    <BaseElement {...props} editable={false} display={ModifiedTimeContentView} />
  )
}

export default ModifiedTimeAttributeBody
