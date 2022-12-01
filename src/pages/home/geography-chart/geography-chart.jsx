import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../../components/GeographyChart";
import Header from "../../../components/GridHeader";
import { tokens } from "../../../common/theme";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isFreeUser } from "../../../service/checkUserRole";

const GeographyChartPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate()
  useEffect(() => {
    if (isFreeUser()) {
      navigate("/home/premium")
    }
  }, [navigate])
  return (
    <Box m="20px">
      <Header title="Immigration Source" subtitle="Where do Canadian Immigrants come from?" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default GeographyChartPage;