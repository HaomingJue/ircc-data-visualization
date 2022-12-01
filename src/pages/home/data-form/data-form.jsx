import {useState, useEffect} from 'react';
import { 
  Box, 
  Button, 
  useTheme, 
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../common/theme";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../../components/GridHeader";
import { checkLoginStatus } from "../../../service/checkLoginStatus";
import { useNavigate } from "react-router-dom";
import { handleRequest, HttpRequest } from "../../../model/http_request";
import Suspense from '../../../components/LoadingSkeleton';
import { isFreeUser } from '../../../service/checkUserRole';

const DataFormPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  let navigate = useNavigate();
  
  useEffect( () => {
    if (!checkLoginStatus()) {
      navigate("/login");
    }
    if (isFreeUser()) {
      navigate("/home/premium")
    }
    getImmigrationColumn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[navigate])

  const getImmigrationColumn = () => {
    let request = new HttpRequest('Get', "/datasource/immigration/*");
    setLoading(true)
    handleRequest(request).then((data) => columnConstruct(data.data)).catch((err) => {setLoading(false); alert(err); setError(err)});
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
    setRows(data);
    setLoading(false);
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
          onClick={() => {navigate("/home/premium")}}
        >
          <LockOpenOutlinedIcon sx={{ mr: "10px" }} />
          Extend Premium
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
        <Suspense
          loading={loading}
          data={rows}
          error={error}
          onRetry={() => getImmigrationColumn}
          type={'table'}
        >
          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Suspense>
      </Box>
    </Box>
  );
};

export default DataFormPage;