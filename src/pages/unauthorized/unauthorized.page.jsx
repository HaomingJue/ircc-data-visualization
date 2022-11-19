import * as React from 'react';
import { Copyright } from '../../components/Copyright';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {  ThemeProvider } from '@mui/material/styles';
import Topbar from '../../common/Topbar';
import { useTheme } from '@emotion/react';

  
  



function UnauthorizedPage() {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
        <Topbar showProfileButton={false} showLogoutButton={false}/>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src="/404.png"></img>
          <Typography component="h1" variant="h1">
            403
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <Typography variant="h6">
            You are unauthorized to access the content.
            </Typography>
                <Box textAlign='center'>
                <Button
                href="/"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Back Home
                </Button>
                </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 4 }} />
    </ThemeProvider>
  );
}

export { UnauthorizedPage };