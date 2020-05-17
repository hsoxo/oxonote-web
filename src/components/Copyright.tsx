import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import React from 'react'
import styled from 'styled-components'

function Copyright() {
  return (
    <BottomBox>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Noxo
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </BottomBox>
  )
}

const BottomBox = styled.footer`
  height: 50px;
`

export default Copyright
