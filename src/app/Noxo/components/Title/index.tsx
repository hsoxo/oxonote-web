import React from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'
import TitleTopArea from './TitleTopArea'
import TitleMainArea from './TitleMainArea'
import { TitleBlockPropsType } from '@/app/Noxo/components/Title/type'

const TitleBlockWrapper = styled(Box)`
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  &:hover > #title-top-area {
    opacity: 1;
  }
`

const TitleBlock: React.FunctionComponent<TitleBlockPropsType> = props => {
  return (
    <TitleBlockWrapper>
      <TitleTopArea {...props}/>
      <TitleMainArea {...props}/>
    </TitleBlockWrapper>
  )
}

export default TitleBlock
