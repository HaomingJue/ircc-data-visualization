import * as React from 'react';
import { Copyright } from '../../components/copyright';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

  
  
  const theme = createTheme();


function NotFoundPage() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            404
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <Typography variant="h6">
            You are in the wilderness of nowhere.
            </Typography>
            <Grid     direction="column"
                        display="flex"
                        justify="center">
                <Box textAlign='center'>
                <Button
                href="/"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Back Home
                </Button>
                </Box>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export { NotFoundPage };