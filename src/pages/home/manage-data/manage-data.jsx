import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../common/theme";
import { mockDataTeam } from "../../../mockData/mockData";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../../components/GridHeader";

const ManageDataPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      editable: true,
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      align: "left",
      flex: 1,
      renderCell: () => {
        return (
          

            <Box display="flex" justifyContent="spacing">
              <Box display="flex" marginRight={2}>
                <Button style={{backgroundColor:colors.greenAccent[600]}}>Update</Button>
              </Box>
              <Box display="flex" marginRight={2}>
                <Button style={{backgroundColor:colors.redAccent[500]}}>Delete</Button>
              </Box>
            </Box>
          
        );
      },
    },
  ];

  return (
    <Box m="20px">

      <Box>
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
            >
              <LockOpenOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>

        </Box>
      <Box
        m="0 0 0 0"
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
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default ManageDataPage;