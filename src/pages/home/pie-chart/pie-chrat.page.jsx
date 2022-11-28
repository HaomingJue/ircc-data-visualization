import { Box } from "@mui/material";
import Header from "../../../components/GridHeader";
import PieChart from "../../../components/PieChart";

const PieChartPage = () => {
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