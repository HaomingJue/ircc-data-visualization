import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/GridHeader";
import LineChart from "../../../components/LineChart";
import { isFreeUser } from "../../../service/checkUserRole";

const LineChartPage = () => {
  let navigate = useNavigate()
  useEffect(() => {
    if (isFreeUser()) {
      navigate("/home/premium")
    }
  }, [navigate])
  return (
    <Box m="20px">
      <Header title="Yearly Trends" subtitle="Check Yearly Trends of Canadian Immigrations" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default LineChartPage;