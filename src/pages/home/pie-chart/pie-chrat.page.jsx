import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/GridHeader";
import PieChart from "../../../components/PieChart";
import { isFreeUser } from "../../../service/checkUserRole";

const PieChartPage = () => {
  let navigate = useNavigate()
  useEffect(() => {
    if (isFreeUser()) {
      navigate("/home/premium")
    }
  }, [navigate])

  return (
    <Box m="20px">
      <Header title="Category Proportion" subtitle="Compare Different Immigration Channels" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default PieChartPage;