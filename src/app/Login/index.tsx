// @ts-nocheck
import React, {useEffect, useContext, useCallback, useState, useRef, ChangeEvent} from 'react'

import { useSnackbar } from 'notistack';
import {Box, Button, Grid, Paper} from "@material-ui/core";
import {BootstrapInput} from "@/components/OxOUI/Input";
import {FlexCenteredBox} from "@/components/OxOUI/OxOBox";
import styled from "styled-components";

const Login = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })

  const {username, password} = loginForm

  return (
    <FlexCenteredBox>
      <LoginPaper>
        <Grid container alignItems={"center"} justify={"center"}>
          <Grid item xs={2}>
            用户名：
          </Grid>
          <Grid item xs={10}>
            <BootstrapInput
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginForm({...loginForm, username: e.target.value})}/>
          </Grid>
          <Grid item xs={2}>
            密码：
          </Grid>
          <Grid item xs={10}>
            <BootstrapInput
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginForm({...loginForm, password: e.target.value})}/>
          </Grid>
          <Button fullWidth>登陆</Button>
        </Grid>
      </LoginPaper>
    </FlexCenteredBox>
  )
}

const LoginPaper = styled(Paper)`
  max-width: 500px;
  padding: 1rem;
  margin: 20vh auto;
`

export default Login