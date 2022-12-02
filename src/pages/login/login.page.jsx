import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
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
import ReCAPTCHA from 'react-google-recaptcha';
import Paper from '@mui/material/Paper';

export function LoginPage() {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isVerified, setIsVerified] = React.useState(false);
  const SITE_KEY = "6LdNq0sjAAAAACkmMORtXORTarlg_CBv0Y2OErE6";

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
    if (!isVerified) {
      alert("Please complete verification first!")
    } else {
      let request = new HttpRequest('Post', '/login/', loginRequest);
      handleRequest(request).then((a) => handleLogin(a)).catch((err) => handleLogin(err));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Topbar showProfileButton={false} showLogoutButton={false}/>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid	
          item	
          xs={false}	
          sm={4}	
          md={7}	
          sx={{	
            backgroundImage: 'url(/user-icons/Parliamenthill.jpg)',	
            backgroundRepeat: 'no-repeat',	
            backgroundColor: (t) =>	
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],	
            backgroundSize: 'cover',	
            backgroundPosition: 'center',	
          }}	
        />	
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>	
          <Box	
            sx={{	
              my: 8,	
              mx: 4,	
              display: 'flex',	
              flexDirection: 'column',	
              alignItems: 'center',	
            }}	
          >	
            <Typography variant='h5' align='center' style={{fontWeight:'bold'}}>IRCC DATA VISUALIZATION SYSTEM </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>	
              <LockOutlinedIcon />	
            </Avatar>	
            <Typography component="h1" variant="h5">	
              Sign in	
            </Typography>	
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>	
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
              <Box sx={{ mt: 2, width: '100%'}}>	
              <ReCAPTCHA
                sitekey={SITE_KEY}	
                onChange={() => {setIsVerified(true)}} 	
                onExpired={() => {setIsVerified(false)}}	
              />	
              </Box>
              <Button	
                type="submit"	
                fullWidth	
                variant="contained"	
                disabled={!isVerified}	
                sx={{ mt: 3, mb: 2, backgroundColor: '#3da58a', ':hover': {bgcolor:'green'}}}	
              >	
                Sign In	
              </Button>
              <Grid container>	
                <Grid item>	
                <Link href="/register" variant="body2" color={colors.primary[100]}>
                    {"Don't have an account? Sign Up"}	
                  </Link>	
                </Grid>	
              </Grid>	
              <Copyright sx={{ mt: 5 }} />	
            </Box>	
          </Box>	
        </Grid>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Grid>
    </ThemeProvider>
  );
}