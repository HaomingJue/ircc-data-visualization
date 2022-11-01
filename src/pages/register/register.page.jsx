import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppRegistration } from '@mui/icons-material';
import { Copyright } from '../../components/copyright';

const theme = createTheme();

function RegisterPage() {
  const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        username: data.get('username'),
        password: data.get('password'),
        });
  };

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AppRegistration />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="repeat_password"
              label="repeat password"
              type="password"
              id="repeat_password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="address"
              id="address"
            />
            <TextField
              margin="normal"
              fullWidth
              name="address_line2"
              label="address (line 2)"
              id="address"
            />
            <Grid container columnSpacing={2}>
                <Grid item xs={4}>
                    <TextField
                        margin="normal"
                        required
                        name="postal_code"
                        label="postal code"
                        id="postal_code"
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="phone_number"
                        label="phone number"
                        id="phone_number"
                    />
                </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign UP
            </Button>
            <Link href="/login" variant="body2" justifyContent="center">
                  {"Back to login page"}
            </Link>
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export {RegisterPage};