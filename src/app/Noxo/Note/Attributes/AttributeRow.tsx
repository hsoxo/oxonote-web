import React from 'react'
import AttributeTitle from './AttributeTitle'
import PropertyBody from "./AttributeContent";
import { AttributeRowWrapper } from "./StyledComponents";
import { HoverGrid } from "./StyledComponents";

type PropertyRowProps = {
  title: React.ReactNode
  content?: React.ReactNode
}

const AttributeRow: React.FunctionComponent<PropertyRowProps>  = (props) => {
  const { title, content } = props
  return (
    <AttributeRowWrapper container>
      <HoverGrid item xs={12} sm={4} md={3} lg={2} xl={2}>
        {title}
      </HoverGrid>
      <HoverGrid item xs={12} sm={8} md={8} lg={10} xl={10}>
        {content ? content : <></>}
      </HoverGrid>
    </AttributeRowWrapper>
  )

}

export default AttributeRow