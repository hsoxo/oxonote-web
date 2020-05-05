import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import sagaAction, {action, useSelector} from "@/store";
import {SAGA_SIGN_UP, setSignUpStatus} from "@/store/global/actions";
import {useSnackbar} from "notistack";
import {GlobalState} from "@/types/states";
import {RequestDefault, RequestDone, RequestErrorMsg, RequestProcessing} from "@/types/request";
import {CircularProgress} from "@material-ui/core";
import styled from "styled-components";
import {pbkdf2Sync} from 'pbkdf2'

const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
}

const validateLength = (s: string) => {
  return s.length > 6 && s.length < 20
}

const validateUsernameChar = (username: string) => {
  const re = /^[a-z0-9\-]+$/
  return re.test(username.toLowerCase())
}

const validatePasswordLowerCase = (password: string) => {
  const re = /[a-z]/
  return re.test(password)
}

const validatePasswordUpperCase = (password: string) => {
  const re = /[A-Z]/
  return re.test(password)
}

const validatePasswordDigit = (password: string) => {
  const re = /[0-9]/
  return re.test(password)
}

const validatePasswordSymbol = (password: string) => {
  const re = /[\-.,!?%$#@*]/
  return re.test(password)
}

const validatePasswordChar = (username: string) => {
  const re = /^[a-z0-9\-.,!?%$#@*]+$/
  return re.test(username.toLowerCase())
}


const RegistrationForm: React.FC<{toggle: () => void}> = ({ toggle }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const validUsernameLength = validateLength(username)
  const validUsernameChar = validateUsernameChar(username)
  const validEmail = validateEmail(email)
  const validPasswordLength = validateLength(password)
  const validPasswordLowerCase = validatePasswordLowerCase(password)
  const validPasswordUpperCase = validatePasswordUpperCase(password)
  const validPasswordDigit = validatePasswordDigit(password)
  const validPasswordSymbol = validatePasswordSymbol(password)
  const validPasswordChar = validatePasswordChar(password)
  const notValid = !validEmail || !validUsernameLength || !validUsernameChar || !validPasswordChar ||
    !validPasswordDigit || !validPasswordLowerCase || !validPasswordUpperCase || !validPasswordSymbol ||
    !validPasswordLength

  const handleSignUp = () => {
    if (!notValid) {
      const derivedKey = pbkdf2Sync(password, 'someSalt', 100, 32, 'sha512')
      sagaAction({ type: SAGA_SIGN_UP, username, password: derivedKey.toString('hex'), email })
    }
  }

  const { signUpStatus }: GlobalState = useSelector(state => state.get('global'))

  const processing = signUpStatus === RequestProcessing

  useEffect(() => {
    if (signUpStatus === RequestDone) {
      enqueueSnackbar('注册成功', { variant: 'success' });
    } else if (signUpStatus >= 40000) {
      enqueueSnackbar(RequestErrorMsg[signUpStatus], { variant: 'error' });
    } else {
      return
    }
    action(setSignUpStatus(RequestDefault))
  }, [signUpStatus])

  return (
    <RegisterWrapper>
      <div className="site-title">OxO Note</div>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="用户名"
                onChange={e => setUsername(e.target.value)}
                autoFocus
              />
              {username.length > 0 && !validUsernameLength &&
              <Typography component="p" variant="body2" color={"secondary"}>
                用户名长度需要大于6并且小于20
              </Typography>}
              {username.length > 0 && !validUsernameChar &&
              <Typography component="p" variant="body2" color={"secondary"}>
                用户名只能由字母、数字或者 - 组成
              </Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                onChange={e => setEmail(e.target.value)}
              />
              {email.length > 0 && !validEmail &&
              <Typography component="p" variant="body2" color={"secondary"}>
                请输入正确的邮箱地址
              </Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="密码"
                type="password"
                autoComplete="new-password"
                onChange={e => setPassword(e.target.value)}
              />
              {password.length > 0 && !validUsernameLength &&
              <Typography component="p" variant="body2" color={"secondary"}>
                密码长度需要大于6并且小于20
              </Typography>}
              {password.length > 0 && !validPasswordLowerCase &&
              <Typography component="p" variant="body2" color={"secondary"}>
                密码需要包含一个小写字母
              </Typography>}
              {password.length > 0 && !validPasswordUpperCase &&
              <Typography component="p" variant="body2" color={"secondary"}>
                密码需要包含一个大写字母
              </Typography>}
              {password.length > 0 && !validPasswordDigit &&
              <Typography component="p" variant="body2" color={"secondary"}>
                密码需要包含一个数字
              </Typography>}
              {password.length > 0 && !validPasswordSymbol &&
              <Typography component="p" variant="body2" color={"secondary"}>
                密码需要包含一个特殊符号 （-.,!?%$#@*）
              </Typography>}
              {password.length > 0 && !validPasswordChar &&
              <Typography component="p" variant="body2" color={"secondary"}>
                密码不能包含字母、数字和（-.,!?%$#@*）意外的符号
              </Typography>}
            </Grid>
            {/*<Grid item xs={12}>*/}
            {/*  <FormControlLabel*/}
            {/*    control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
            {/*    label="I want to receive inspiration, marketing promotions and updates via email."*/}
            {/*  />*/}
            {/*</Grid>*/}
          </Grid>
          <Box width={'70%'} margin={'30px auto 50px'}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={notValid || processing}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            {processing && <CircularProgress size={24}/>}
          </Box>
          <ButtomActionArea>
            <div onClick={toggle}>
              {"Already have an account? Sign in ➡️"}
            </div>
          </ButtomActionArea>
        </form>
    </RegisterWrapper>
  );
}

const RegisterWrapper = styled.div`
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
const ButtomActionArea = styled.div`
  width: calc(100% - 80px);
  position: fixed;
  bottom: 10px;
  margin: 5px auto;
  color: var(--primary-color);
  &:hover {
    cursor: pointer;
  }
`

export default RegistrationForm
