import { Box} from "@mui/material";
import Header from "../../../components/GridHeader";
import DataForm from "../../../components/DataForm";

const DataFormPage = () => {
  return (<Box m="20px">
  <Header title="Manage User" subtitle="Managing current users" />
  <DataForm />
  </Box>);
};

export default DataFormPage;