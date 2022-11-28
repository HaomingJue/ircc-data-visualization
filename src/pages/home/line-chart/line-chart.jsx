import { Box } from "@mui/material";
import Header from "../../../components/GridHeader";
import LineChart from "../../../components/LineChart";

const LineChartPage = () => {
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