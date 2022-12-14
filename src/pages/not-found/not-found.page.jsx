import * as React from 'react';
import { Copyright } from '../../components/Copyright';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {  ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import Topbar from '../../common/Topbar';

function NotFoundPage() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
        <Topbar showProfileButton={false} showLogoutButton={false}/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src="/404.png" alt="unavailable"></img>
          <Typography component="h1" variant="h1">
            404
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <Typography variant="h6">
            You are in the wilderness of nowhere.
            </Typography>
                <Box textAlign='center'>
                <Button
                href="/home"
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

export { NotFoundPage };