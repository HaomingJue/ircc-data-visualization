import { 
    Grid, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Dialog, 
    Box, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    Typography, 
    Card, 
    CardContent, 
    Button, 
    CardActions,
    LinearProgress, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText
} from "@mui/material";
import TransgenderOutlinedIcon from '@mui/icons-material/TransgenderOutlined';
import { useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../../../service/checkLoginStatus";
import { useEffect, useState } from "react";
import { getLocal, updateLocal } from "../../../service/localStorage";
import dateFormat from 'dateformat';
import { Home, AccountCircle, Cake, PhoneAndroid, Signpost } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { tokens } from "../../../common/theme";
import { handleRequest, HttpRequest } from "../../../model/http_request";
import { User } from "../../../model/user";

const ProgfilePage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [iconId, setIconId] = useState("icon-1");
    const [user, setUser] = useState(getLocal('user') || new User())
    
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!checkLoginStatus()) {
            navigate("/login");
        }
        setIconId(user.icon);
    }, [navigate, user])

    const [gender, setGender] = useState("Male");

    const handleGenderChange = (e) => {
      setGender(e.target.value)
    };

    let subscriptionStatus = Date.parse(user?.expireDate) > Date.now();

    const userStatusContent = (subscriptionStatus) => {
        if (subscriptionStatus) {
            return <>
                <Typography variant="h5" sx={{ mb: 1.5 }} color={colors.redAccent[500]}>Premium User</Typography>
                <LinearProgress variant="determinate" value={60} />
                <Typography sx={{ mt: 1.5, mb: -1.5, fontSize: 'bold' }} variant="h7">
                    {`Your Plan will be expired at: ${dateFormat(user?.expireDate, 'yyyy-mm-dd')}`}
                </Typography>
            </>
        } else if (user.role) {
            return <>
                <Typography variant="h5" sx={{ mb: 1.5 }} color="text.secondary">Admin</Typography>
                <Typography variant="h7">
                    "You are the king of the System!"
                </Typography>
            </>
        } else {
            return <>
                <Typography variant="h5" sx={{ mb: 1.5 }} color="text.secondary">Free User</Typography>
                <Typography variant="h7">
                    "Upgrade your plan to access all the functions!"
                </Typography>
            </>
        }
    }

    const handleUpdate = (result) => {
        let status = result['status'];
        if (status >= 200 && status <= 299) {
          alert("Update Succesfully")
          setUser(updateLocal())
        } else {
          alert('Update Error\n' + result.message + '\n' + result.request.response);
        }
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowModal(false);
        const data = new FormData(event.currentTarget);
        let registerRequest = {};
        const first_name = data.get('firstName');
        const last_name = data.get('lastName');
        const full_name = first_name + ' ' + last_name;
        registerRequest["username"] = data.get('username');
        registerRequest["first_name"] = first_name;
        registerRequest["last_name"] = last_name;
        registerRequest["full_name"] = full_name;
        registerRequest["user_gender"] = data.get('gender');
        registerRequest["email"] = data.get('userEmail');
        registerRequest["user_phone"] = data.get('phone');
        registerRequest["user_icon"] = data.get('iconId');
        registerRequest["user_address"] = data.get('address');
        registerRequest["user_postcode"] = data.get('postcode');

        let request = new HttpRequest('Put', `/login/update/${data.get('userId')}`, registerRequest);
        handleRequest(request).then((a) => handleUpdate(a)).catch((err) => handleUpdate(err));
    }

    const handleIconChange = (e) => {
        setIconId(e.target.value);
    };

    const getProgressValue = () => {
        return 60
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box className="profile_name">
                        <Typography variant="h3" align="center">{`Welcome, ${user.username}`}</Typography>
                        <Typography variant="h4" sx={{color: colors.greenAccent[500]}} align="center">{`${user.firstName} ${user.lastName}`}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ backgroundColor: colors.primary[400], minWidth: '100%', marginLeft: '12px' }}>
                        <CardContent>
                            <Typography variant="h5" sx={{ fontSize: 'bold', fontWeigt: 'bold' }} gutterBottom={true}>
                                Your Subscription Status is: 
                            </Typography>
                            {userStatusContent(subscriptionStatus)}
                        </CardContent>
                        <CardActions>
                            <Button sx={{variant: "h3", color: colors.greenAccent[500]}}
                                onClick={() => {navigate("/home/premium")}}
                            >
                                {subscriptionStatus ? "Extend Your Plan" : "See Subscription Plans"}
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card sx={{ backgroundColor: colors.primary[400], minWidth: '100%', marginLeft: '12px' }}>
                        <CardContent>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <ListItemText sx={{maxWidth: '30%', color: colors.blueAccent[500]}} primary="Username: " />
                                    <ListItemText primary={user.username} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <ListItemText sx={{maxWidth: '30%', color: colors.blueAccent[500]}} primary="First Name: " />
                                    <ListItemText primary={user.firstName} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <ListItemText sx={{maxWidth: '30%', color: colors.blueAccent[500]}} primary="Last Name: " />
                                    <ListItemText primary={user.lastName} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Cake />
                                    </ListItemIcon>
                                    <ListItemText sx={{maxWidth: '30%', color: colors.blueAccent[500]}} primary="Email: " />
                                    <ListItemText sx={{justifyContent: 'center'}} primary={user.userEmail} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <TransgenderOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText sx={{maxWidth: '30%', color: colors.blueAccent[500]}} primary="Gender: " />
                                    <ListItemText primary={user.gender} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <PhoneAndroid />
                                    </ListItemIcon>
                                    <ListItemText sx={{maxWidth: '30%', color: colors.blueAccent[500]}} primary="Phone: " />
                                    <ListItemText primary={user.phone} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText sx={{maxWidth: '30%', color: colors.blueAccent[500]}} primary="Address: " />
                                    <ListItemText primary={user.address} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Signpost />
                                    </ListItemIcon>
                                    <ListItemText sx={{maxWidth: '30%', color: colors.blueAccent[500]}} primary="Postcode: " />
                                    <ListItemText primary={user.postcode} />
                                </ListItem>
                            </List>
                        </CardContent>
                        <CardActions sx={{justifyContent: 'center'}}>
                            <Button sx={{font: "h3", color: colors.greenAccent[500]}} onClick={() => {setShowModal(true)}}>Edit Profile</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <Dialog 
                open={showModal} 
                onClose={() => {setShowModal(false)}}
            >
                <DialogTitle>Your Personal Information</DialogTitle>
                <DialogContent>
                    <Box display="flex" justifyContent="center" >
                        <img
                        alt="profile-user"
                        width="100px"
                        height="100px"
                        src={`/user-icons/${iconId}`}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container columnSpacing={2}>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <FormControl sx={{ justifyContent: 'center', marginTop: 2, minWidth: 120 }} required>
                                    <InputLabel id="demo-simple-select-helper-label">Icon</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id={iconId}
                                        value={iconId}
                                        label="IconId"
                                        name="iconId"
                                        onChange={handleIconChange}
                                    >
                                        <MenuItem value={'icon-1.png'}>icon-1</MenuItem>
                                        <MenuItem value={'icon-2.png'}>icon-2</MenuItem>
                                        <MenuItem value={'icon-3.png'}>icon-3</MenuItem>
                                        <MenuItem value={'elon-musk.png'}>elon musk</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
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
                            <Grid item xs={3}/>
                        </Grid>
                        <TextField
                            type="hidden"
                            defaultValue={user?.userId}
                            id="userId"
                            name="userId"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            defaultValue={user?.username}
                            margin="dense"
                            id="username"
                            label="Username"
                            name="username"
                            fullWidth
                            InputProps={{readOnly: true}}
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            defaultValue={user?.firstName}
                            required
                            margin="dense"
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            defaultValue={user?.lastName}
                            required
                            margin="dense"
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            defaultValue={user?.userEmail}
                            margin="dense"
                            id="userEmail"
                            label="Email"
                            name="userEmail"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            defaultValue={user?.phone}
                            margin="dense"
                            required
                            id="phone"
                            label="Phone"
                            name="phone"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            defaultValue={user?.address}
                            margin="dense"
                            required
                            id="address"
                            name="address"
                            label="Address"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            defaultValue={user?.postcode}
                            margin="dense"
                            required
                            id="postcode"
                            name="postcode"
                            label="Postcode"
                            fullWidth
                            variant="standard"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: '#3da58a', ':hover': {bgcolor:'green'}}}
                            >
                            Update
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        sx={{ mt: 3, mb: 2, backgroundColor: colors.primary[800], ':hover': {bgcolor: colors.primary[300]}}}
                        onClick={() => {setShowModal(false)}}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
  }

export default ProgfilePage;