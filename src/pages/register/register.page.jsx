import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider } from '@mui/material/styles';
import { AppRegistration } from '@mui/icons-material';
import { Copyright } from '../../components/Copyright';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { checkLoginStatus } from '../../service/checkLoginStatus';
import { useEffect } from 'react';
import { HttpRequest, handleRequest } from '../../model/http_request';
import ReCAPTCHA from 'react-google-recaptcha';
import Topbar from '../../common/Topbar';

function RegisterPage() {
  const theme = useTheme();
  const [isVerified, setIsVerified] = React.useState(false);
  const SITE_KEY = "6LdNq0sjAAAAACkmMORtXORTarlg_CBv0Y2OErE6";

  let navigate = useNavigate(); 
  // default check valid token

  useEffect(() => {
    if (checkLoginStatus()) {
      navigate("/home/dashboard");
    }
  }, [navigate, theme.palette.mode]);


  const handleRegister = (result) => {
    let status = result['status'];
    if (status >= 200 && status <= 299) {
      navigate("/login")
    } else {
      // show modal;
      alert("Register Error" + result.message + '\n' + result.request.response);
    }
  }


  const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var username = data.get('username')
        var password = data.get('password')
        var repeatPassword = data.get('repeat_password')
        var icon = data.get('IconId') + '.png'
        var address = data.get('address_1') + ' ' + data.get('address_2')
        var postalCode = data.get('postal_code')
        var phoneNumber = data.get('phone_number')
        var firstName = data.get("first_name");
        var lastName = data.get("last_name");
        var email = data.get("email")
        var gender = data.get("gender")
        if (password !== repeatPassword) {
          alert('Password does not match!')
        } else if (!isVerified) {
          alert("Please complete verification first!")
        } else {
          let registerRequest = {};
          registerRequest["username"] = username;
          registerRequest["password"] = password;
          registerRequest["user_address"] = address;
          registerRequest["user_phone"] = phoneNumber;
          registerRequest["user_postcode"] = postalCode;
          registerRequest["email"] = email;
          registerRequest["user_icon"] = icon;
          registerRequest["first_name"] = firstName;
          registerRequest["last_name"] = lastName;
          registerRequest["user_gender"] = gender;
          let request = new HttpRequest('Post', '/login/register/', registerRequest);
          handleRequest(request).then((a) => handleRegister(a)).catch((err) => handleRegister(err));
        }
  };

  const [iconId, setIconId] = React.useState("icon-1");
  const [iconImg, setIconImg] = React.useState("./user-icons/icon-1.png");

  const handleIconChange = (e) => {
    setIconId(e.target.value)
    setIconImg("./user-icons/" + e.target.value + ".png")
  };

  const [gender, setGender] = React.useState("Male");

  const handleGenderChange = (e) => {
    setGender(e.target.value)
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
            <AppRegistration />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box display="flex" justifyContent="flex-end" padding={2} marginTop={"30px"} >
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={iconImg}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
          </Box>

        
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <Grid container columnSpacing={2}>
                <Grid item xs={8}>
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
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ marginTop: 2, minWidth: 120 }} required>
                      <InputLabel id="demo-simple-select-helper-label">Icon</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={iconId}
                        label="IconId"
                        name="IconId"
                        onChange={handleIconChange}
                      >
                        <MenuItem value={'icon-1'}>icon-1</MenuItem>
                        <MenuItem value={'icon-2'}>icon-2</MenuItem>
                        <MenuItem value={'icon-3'}>icon-3</MenuItem>
                        <MenuItem value={'elon-musk'}>elon musk</MenuItem>
                      </Select>
                  </FormControl>
                </Grid>
            </Grid>
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
              fullWidth
              name="first_name"
              label="First Name"
              id="first_name"
            />
          <Grid container columnSpacing={2}>
                <Grid item xs={8}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ marginTop: 2, minWidth: 120 }} required>
                      <InputLabel id="gender">Gender</InputLabel>
                      <Select
                        id="demo-simple-select-helper"
                        value={gender}
                        label="Gender"
                        name="gender"
                        onChange={handleGenderChange}
                      >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                        <MenuItem value={'Anatomical'}>Anatomical</MenuItem>
                        <MenuItem value={'Cisgender'}>Cisgender</MenuItem>
                        <MenuItem value={'Transgender'}>Transgender</MenuItem>
                        <MenuItem value={'Cishet'}>Cishet</MenuItem>
                        <MenuItem value={'Non-binary'}>Non-binary</MenuItem>
                        <MenuItem value={'Genderqueer'}>Genderqueer</MenuItem>
                      </Select>
                  </FormControl>
                </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="email"
              id="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address_1"
              label="address"
              id="address_1"
            />
            <TextField
              margin="normal"
              fullWidth
              name="address_2"
              label="address (line 2)"
              id="address_2"
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
            <Box sx={{ mt: 2, width: '100%'}}>
              <ReCAPTCHA 
                sx={{width: '400'}}
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