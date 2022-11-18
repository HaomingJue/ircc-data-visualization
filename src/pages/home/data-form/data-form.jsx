import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../common/theme";
import { mockDataTeam } from "../../../mockData/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/GridHeader";
import DataForm from "../../../components/DataForm";

const DataFormPage = () => {
  return (<Box m="20px">
  <Header title="Manage User" subtitle="Managing current users" />
  <DataForm />
  </Box>);
};

export default DataFormPage;