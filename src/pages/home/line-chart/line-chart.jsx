import { Box } from "@mui/material";
import Header from "../../../components/GridHeader";
import LineChart from "../../../components/LineChart";

const LineChartPage = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default LineChartPage;