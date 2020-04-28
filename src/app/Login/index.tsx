import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import sagaAction, {action, useSelector} from "@/store";
import {SAGA_LOAD_USER, SAGA_LOGIN, setLoginStatus} from "@/store/global/actions";
import {GlobalState} from "@/types/states";
import {RequestDefault, RequestDone, RequestError, RequestProcessing} from "@/types/request";
import {CircularProgress, Grid} from "@material-ui/core";
import {getToken} from "@/utils/auth";

import Copyright from "@/components/Copyright";
import {useSnackbar} from "notistack";
import {Spring, Transition, animated} from "react-spring/renderprops-universal";


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -12,
  },
}));

const handleLogin = (username: string, password: string) => {
  sagaAction({ type: SAGA_LOGIN, username, password })
}


export default function SignIn() {
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const [showForm, toggleForm] = useState(true)
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box minHeight={"100vh"} margin={"0 auto -50px"}>
        <Transition
          items={showForm}
          config={{ tension: 210, friction: 23}}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}>
          {showForm =>
            props =>
              showForm ?
                <div style={props}>
                  <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                      <TextField
                        variant="outlined"
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
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="密码"
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                      />
                      {/*<FormControlLabel*/}
                      {/*  control={<Checkbox value="remember" color="primary" />}*/}
                      {/*  label="Remember me"*/}
                      {/*/>*/}
                      <div className={classes.wrapper}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          disabled={processing}
                          onClick={() => handleLogin(username, password)}
                        >
                          Sign In
                        </Button>
                        {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
                      </div>
                      <Grid container>
                        {/*<Grid item xs>*/}
                        {/*  <Link href="#" variant="body2">*/}
                        {/*    Forgot password?*/}
                        {/*  </Link>*/}
                        {/*</Grid>*/}
                        <Grid item>
                          <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                </div>
                : null}
        </Transition>
      </Box>
      <Copyright />
    </Container>
  );
}