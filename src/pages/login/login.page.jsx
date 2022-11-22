import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider } from '@mui/material/styles';
//test import
import { HttpRequest, handleRequest } from '../../model/http_request';
import { User } from '../../model/user';
import { Copyright } from '../../components/Copyright';
import { tokens } from '../../common/theme';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../common/Topbar';
import { useTheme } from '@emotion/react';
import { useEffect } from 'react';
import {  setLocal } from '../../service/localStorage';
import { checkLoginStatus } from '../../service/checkLoginStatus';

export function LoginPage() {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let navigate = useNavigate(); 
  // default check valid token

  useEffect(() => {
    if (checkLoginStatus()) {
      navigate("/home/dashboard");
    }
  }, [navigate]);

  const handleLogin = (result) => {
    let status = result['status'];
    let data = result['data'];
    if (status >= 200 && status <= 299) {
      let currentUser = new User(data);
      console.log(currentUser);
      setLocal('user', currentUser);
      navigate("/home/dashboard");
    } else {
      // show modal;
      alert('Login Error\n' + result.message + '\n' + result.request.response);
    }
  } 

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let loginRequest = {};
    loginRequest["username"] = data.get('username');
    loginRequest["password"] = data.get('password');
    let request = new HttpRequest('Post', '/login/', loginRequest);
    handleRequest(request).then((a) => handleLogin(a)).catch((err) => handleLogin(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Topbar showProfileButton={false} showLogoutButton={false}/>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#3da58a', ':hover': {bgcolor:'green'}}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color={colors.primary[100]}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2" color={colors.primary[100]}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}