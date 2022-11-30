import { Box, useTheme } from "@mui/material";
import Header from "../../../components/GridHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../../common/theme";

const FAQPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography color={colors.greenAccent[500]} variant="h5">
          What is the purpose of this web application?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          This system is mainly used for immigration statistics. 
          The goal is for the IRCC to get information about people with migration motives so
           that the government can introduce relevant policies for immigration. In addition to the
            data collection, the system also emphasizes data visualization and data analysis, 
            which will help to simplify reports by using charts, tables, and dashboards.	
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          For which type of user is this application useful?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The prime target group of the app includes immigrations, 
          international students, employees, and individuals who either willing to gather 
          immigration information.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          What are the benefits of this web application?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The purpose of this product is to build an online IRCC data Visualization
           system which collects immigration data from
           IRCC’s public website, sorts the collected data, 
           and presents the data according to its categories which helps our user better understand the
            meaning of this data.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Why should I be a premium member and pay for subscription?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The Subscribers should be able to access all the data in the system,
           while free users can only access part of them.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          How can I trust that the data on this application is correct and updated?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This mentioned link here is the main and the only reference for this application. We are 
            so responsible to our users and the data we provided them with, but in case, you are always able
             to check some randome data to be sure that we are always updated.
            https://www.canada.ca/en/immigration-refugees-citizenship.html 
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQPage;