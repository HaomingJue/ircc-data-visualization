import {useState, useEffect} from 'react';
import { 
  Box, 
  Button, 
  useTheme, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../common/theme";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Header from "../../../components/GridHeader";
import { checkLoginStatus } from "../../../service/checkLoginStatus";
import { useNavigate } from "react-router-dom";
import { handleRequest, HttpRequest } from "../../../model/http_request";
import Dropzone from '../../../components/FileDropZone';

const ManageImmigrationDataPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState();

  let navigate = useNavigate();
  
  useEffect( () => {
    if (!checkLoginStatus()) {
      navigate("/login");
    }
    getImmigrationColumn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[navigate])

  const getImmigrationColumn = () => {
    let request = new HttpRequest('Get', "/datasource/immigration/*");
    handleRequest(request).then((data) => columnConstruct(data.data)).catch((err) => alert(err));
  }

  let columnMap = new Map();
  columnMap["source"] = "source country"
  columnMap["address"] = "destination"


  const columnConstruct = (data) => {
    const columns = [];
    for (let variable in data[0]) {
      columns.push({
        field: variable,
        headerName: columnMap[variable] !== undefined ? columnMap[variable] : variable,
        flex: 1,
        editable: true,
      });
    }
    data.sort(function(a, b) {
      return a['id'] - b['id'];
    })
    setColumns(columns);
    setRows(data)
  }

  const handleUpdate = () => {
    let request = new HttpRequest('Post', "/datasource/immigration_data/upload", {"upload_file": file.split(',')[1]});
    handleRequest(request).then(() => {setShowModal(false); getImmigrationColumn()}).catch((err) => alert(err));
  }

  const handleOnDrop = (e) => {
    getBase64(e[0])
  }

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setFile(reader.result)
    };
    reader.onerror = function (error) {
      alert('Upload Error: ', error);
    };
 }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Immigration Data Records" subtitle="Check IRCC's public immigration records" />
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
          <DriveFolderUploadIcon sx={{ mr: "10px" }} />
          Import New Records
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
          <DialogTitle>Your Personal Information</DialogTitle>
          <DialogContent>
            <Dropzone onDrop={handleOnDrop} />
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              sx={{ mt: 3, mb: 2, backgroundColor: colors.primary[800], ':hover': {bgcolor: colors.primary[300]}}}
              onClick={() => {setShowModal(false)}}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#3da58a', ':hover': {bgcolor:'green'}}}
              >
              Upload
            </Button>
          </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageImmigrationDataPage;