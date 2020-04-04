import React from 'react'
import AttributeTitle from './AttributeTitle'
import PropertyBody from "./AttributeContent";
import { AttributeRowWrapper } from "./StyledComponents";

type PropertyRowProps = {
  title: React.ReactNode
  content?: React.ReactNode
}

const AttributeRow: React.FunctionComponent<PropertyRowProps>  = (props) => {
  const { title, content } = props
  return (
    <AttributeRowWrapper>
      {title}
      {content ? content : <></>}
    </AttributeRowWrapper>
  )

}

export default AttributeRow