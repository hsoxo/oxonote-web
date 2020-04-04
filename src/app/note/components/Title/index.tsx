import React from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'
import TitleTopAera from './TitleTopArea'
import TitleMainArea from './TitleMainArea'
import { TitleBlockPropsType } from '@/app/note/components/Title/types'

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
      <TitleTopAera {...props}/>
      <TitleMainArea {...props}/>
    </TitleBlockWrapper>
  )
}

export default TitleBlock
