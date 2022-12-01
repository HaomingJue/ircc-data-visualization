import { Box, Button,  Typography, useTheme } from "@mui/material";
import { tokens } from "../../../common/theme";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../../components/GridHeader";
import LineChart from "../../../components/LineChart";
import GeographyChart from "../../../components/GeographyChart";
import BarChart from "../../../components/BarChart";
import { useEffect, useState } from "react";
import { checkLoginStatus } from "../../../service/checkLoginStatus";
import { useNavigate } from "react-router-dom";
import PieChart from "../../../components/PieChart";
import { handleRequest, HttpRequest } from "../../../model/http_request";

const DashboardPage = () => {
  
  let navigate = useNavigate();

  useEffect( () => {
    if (!checkLoginStatus()) {
      navigate("/login");
    }
    getImmigrationColumn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[navigate])

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const [immigrationData, setImmigrationData] = useState([])
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState();

  const getImmigrationColumn = () => {
    console.log("123456")
    let request = new HttpRequest('Get', "/datasource/immigration/free");
    // setLoading(true);
  handleRequest(request).then((data) => constructData(data.data)).catch((err) => {/*setLoading(false);*/ alert(err); /*setError(err)*/});
  }
  let dataKeyMap = ["year", "gender", "age", "category", "source", "address", "status"]


  const constructData = (data) => {
    setImmigrationData(data)
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome IRCC Data Visualization Dashboard" />
        <Box>
          <Button
           onClick={() => {navigate("/home/premium")}}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <LockOpenOutlinedIcon sx={{ mr: "10px" }} />
            Unlock Premium
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        borderBottom="20px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Yearly Trends
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0" display={"flex"}>
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 20px" }}
          >
            Category Proportion
          </Typography>
          <Box height="250px" mt="-20px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 6"
          marginBottom="10px"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
            <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Immigration Records (Go to premium records form to see more to see more)
            </Typography>
          </Box>
          {immigrationData.map((oneRow) => (
            <Box
              key={immigrationData["id"]}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              {
                dataKeyMap.map((key) => {
                return <Box width={() => {
                    if (key === "category") {
                      return "230px"
                    }
                    else if (key === "status") {
                      return "200px"
                    }
                    else{
                      return "100px"
                    }
                  }}>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {key}
                    {/* {key === "year" ? oneRow["status"] : " "} */}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {oneRow[key]}
                  </Typography>
                </Box>
                } )
              }
            </Box>
          ))}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 20px" }}
          >
            Destination Statistics
          </Typography>
          <Box height="370px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          padding="30px 30px 0px 20px"
          marginBottom="10px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Immigration Source
          </Typography>
          <Box height="350px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;