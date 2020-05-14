import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Box, CircularProgress} from "@material-ui/core";
import {GlobalState} from "@/types/states";
import sagaAction, {action, useSelector} from "@/store";
import {RequestDefault, RequestDone, RequestError, RequestProcessing} from "@/types/request";
import {SAGA_LOGIN, setLoginStatus} from "@/store/global/actions";
import {useSnackbar} from "notistack";
import styled from "styled-components";
import {sha256} from "@/utils/sha256";

const handleLogin = (username: string, password: string) => {
  const derivedKey = sha256(password) as string
  sagaAction({ type: SAGA_LOGIN, username, password: derivedKey })
}

const LoginFrom: React.FC<{toggle: () => void}> = ({ toggle }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { loginStatus }: GlobalState = useSelector(state => state.get('global'))

  const processing = loginStatus === RequestProcessing

  useEffect(() => {
    if (loginStatus === RequestError) {
      enqueueSnackbar('登陆失败', { variant: 'error' });
    } else if (loginStatus === RequestDone) {
      enqueueSnackbar('登陆成功', { variant: 'success' });
    }
    action(setLoginStatus(RequestDefault))
  }, [loginStatus])

  return (
    <LoginWrapper>
      <div className="site-title">OxO Note</div>
      <form noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="用户名"
          name="username"
          onChange={e => setUsername(e.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="密码"
          type="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleLogin(username, password)
              e.preventDefault();
            }
          }}
        />
        <Box width={'70%'} margin={'40px auto'}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={processing}
            onClick={() => handleLogin(username, password)}
          >
            Sign In
          </Button>
          {processing && <CircularProgress size={24}/>}
        </Box>
        <SignUpWrapper>
          <div onClick={toggle}>
            {"Don't have an account? Sign Up ➡️"}
          </div>
        </SignUpWrapper>
      </form>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  margin: 5px 40px;
  min-height: 45vh;
  .site-title {
    font-family: "SwankyandMooMoo", sans-serif;
    font-weight: bold;
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 30px;
  }
`
const SignUpWrapper = styled.div`
  width: calc(100% - 80px);
  position: fixed;
  bottom: 10px;
  margin: 5px auto;
  color: var(--primary-color);
  &:hover {
    cursor: pointer;
  }
`

export default LoginFrom;