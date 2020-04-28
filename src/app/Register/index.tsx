import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Copyright from "@/components/Copyright";
import sagaAction, {action, useSelector} from "@/store";
import {SAGA_LOGIN, SAGA_SIGN_UP, setLoginStatus, setSignUpStatus} from "@/store/global/actions";
import {useSnackbar} from "notistack";
import {red} from "@material-ui/core/colors";
import {GlobalState} from "@/types/states";
import {RequestDefault, RequestDone, RequestError, RequestProcessing} from "@/types/request";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    position: 'absolute',
    left: '50%',
    marginTop: 29,
    marginLeft: -12,
  },
}));


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


export default function SignUp() {
  const classes = useStyles();
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
    if (!notValid)
      sagaAction({ type: SAGA_SIGN_UP, username, password, email })
  }

  const { signUpStatus }: GlobalState = useSelector(state => state.get('global'))

  const processing = signUpStatus === RequestProcessing

  useEffect(() => {
    if (signUpStatus === RequestError) {
      enqueueSnackbar('注册失败', { variant: 'error' });
    } else if (signUpStatus === RequestDone) {
      enqueueSnackbar('注册成功', { variant: 'success' });
    }
    action(setSignUpStatus(RequestDefault))
  }, [signUpStatus])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <input type="password" hidden autoComplete="new-password"/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
                variant="outlined"
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
                variant="outlined"
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
          <Grid container>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={notValid || processing}
              onClick={handleSignUp}
              className={classes.submit}
            >
              Sign Up
            </Button>
            {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}