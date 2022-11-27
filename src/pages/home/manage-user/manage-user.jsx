import {useState, useEffect} from 'react';
import { 
  Box, 
  Button, 
  useTheme, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField,  
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../common/theme";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../../components/GridHeader";
import { checkLoginStatus } from "../../../service/checkLoginStatus";
import { useNavigate } from "react-router-dom";
import { handleRequest, HttpRequest } from "../../../model/http_request";

const ManageUserPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [iconId, setIconId] = useState("icon-1.png");
  const [gender, setGender] = useState("Male");
  const [isStaff, setIsStaff] = useState(false);

  let navigate = useNavigate();
  
  useEffect( () => {
    if (!checkLoginStatus()) {
      navigate("/login");
    }
    getUserColumn();
  },[navigate])

  const getUserColumn = () => {
    let request = new HttpRequest('Get', `/login/update/*`);
    handleRequest(request).then((a) => columnAndRowConstruct(a.data)).catch((err) => alert(err));
  }

  const columnAndRowConstruct = (datas) => {
    const columns = [];
    for (let variable in datas[0]) {
      columns.push({
        field: variable,
        headerName: variable.charAt(0).toUpperCase() + variable.slice(1),
        flex: 1,
        editable: true,
      });
    }
    setColumns(columns);
    setRows(datas);
  }

  const handleUpdate = (result) => {
    let status = result['status'];
    if (status >= 200 && status <= 299) {
      alert("Create User Succesfully")
      getUserColumn();
    } else {
      alert("Create User Error");
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
    registerRequest["password"] = data.get('password');
    registerRequest["first_name"] = first_name;
    registerRequest["last_name"] = last_name;
    registerRequest["full_name"] = full_name;
    registerRequest["user_gender"] = data.get('gender');
    registerRequest["user_phone"] = data.get('phone');
    registerRequest["user_icon"] = data.get('iconId');
    registerRequest["user_address"] = data.get('address');
    registerRequest["user_postcode"] = data.get('postcode');
    registerRequest["is_staff"] = data.get('is_staff');

    let request = new HttpRequest('Post', `/login/register/`, registerRequest);
    handleRequest(request).then((a) => handleUpdate(a)).catch((err) => handleUpdate(err));
  }

  const handleIconChange = (e) => {
    setIconId(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value)
  };

  const handleAdminChange = (e) => {
    setIsStaff(e.target.value)
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Manage User" subtitle="Managing current users" />
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={() => {setShowModal(true)}}
        >
          <LockOpenOutlinedIcon sx={{ mr: "10px" }} />
          Add New User
        </Button>
      </Box>

      <Box
        m="0px 0 0 0"
        height="72vh"
        min-height= "100vh"
        box-sizing="border-box"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
      <Dialog 
        open={showModal} 
        onClose={() => {setShowModal(false)}}
        >
          <DialogTitle>User Personal Information</DialogTitle>
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
                <Grid item xs={1.5}/>
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
                <Grid item xs={3}>
                  <FormControl sx={{ justifyContent: 'center', marginTop: 2, minWidth: 120 }} required>
                    <InputLabel id="demo-simple-select-helper-label">Admin</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id={isStaff}
                      value={isStaff}
                      label="Is Admin"
                      name="is_staff"
                      onChange={handleAdminChange}
                    >
                      <MenuItem value={false}>Not Admin</MenuItem>
                      <MenuItem value={true}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1.5}/>
              </Grid>
              <TextField
                autoFocus
                defaultValue={''}
                margin="dense"
                id="username"
                label="Username"
                name="username"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                defaultValue={''}
                margin="dense"
                id="password"
                label="Password"
                name="password"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                defaultValue={''}
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
                defaultValue={''}
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
                defaultValue={''}
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
                defaultValue={''}
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
                defaultValue={''}
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
                Create
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {setShowModal(false)}}>Cancel</Button>
          </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUserPage;