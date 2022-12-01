import { Box } from "@mui/material";
import Header from "../../../components/GridHeader";
import BarChart from "../../../components/BarChart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isFreeUser } from "../../../service/checkUserRole";

const BarChartPage = () => {
  let navigate = useNavigate()
  useEffect(() => {
    if (isFreeUser()) {
      navigate("/home/premium")
    }
  }, [navigate])
  return (
    <Box m="20px">
      <Header title="Destination Chart" subtitle="Immigration Categories and Destinations" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default BarChartPage;