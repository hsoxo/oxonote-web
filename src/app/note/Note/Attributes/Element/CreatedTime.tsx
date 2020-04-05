import React from 'react'
import { ElementProps } from './types'
import BaseElement, { ContentViewProps } from './Base'

export const CreatedTimeContentView: React.FunctionComponent<ContentViewProps> = ({
                                                                           noteInfo
                                                                         }) => {
  return <div>{new Date(noteInfo.createdTime).toLocaleString()}</div>
}

const CreatedTimeAttributeBody = (props: ElementProps) => {
  return (
    <BaseElement {...props} editable={false} display={CreatedTimeContentView} />
  )
}

export default CreatedTimeAttributeBody
