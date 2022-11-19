import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from "./pages/login/login.page";
import { RegisterPage } from "./pages/register/register.page";
import { NotFoundPage } from "./pages/not-found/not-found.page";
import { UnauthorizedPage } from "./pages/unauthorized/unauthorized.page";
import  HomePage from './pages/home/home.page';
import { ColorModeContext, useMode } from './common/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import UserGridPage from './pages/home/manage-user/manage-user';
import CreateUserPage from './pages/home/create-user/create-user';
import FAQ from './pages/home/faq/faq';
import ManageDataPage from './pages/home/manage-data/manage-data';
import DataFormPage from './pages/home/data-form/data-form';
import BarChartPage from './pages/home/bar-chart/bar-chart';
import LineChartPage from './pages/home/line-chart/line-chart';
import PieChartPage from './pages/home/pie-chart/pie-chrat.page';
import GeographyChartPage from './pages/home/geography-chart/geography-chart';
import DashboardPage from './pages/home/dashboard/dashboard';
import PremiumPage from './pages/home/premium-page/premium-page';


function App() {

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/home" element={<HomePage/>} >
              <Route path="dashboard" element={<DashboardPage/>}></Route>
              <Route path="manage-user" element={<UserGridPage/>} />
              <Route path="create-user" element={<CreateUserPage/>} />
              <Route path="manage-data" element={<ManageDataPage/>} />
              <Route path="premium" element={<PremiumPage/>} />
              <Route path="data-form" element={<DataFormPage/>} />
              <Route path='faq' element={<FAQ/>} />
              <Route path='bar-chart' element={<BarChartPage/>} />
              <Route path='line-chart' element={<LineChartPage/>} />
              <Route path='pie-chart' element={<PieChartPage/>} />
              <Route path='geography-chart' element={<GeographyChartPage/>} />
            </Route>
            <Route path="/register" element={<RegisterPage/>} />
            <Route path='/404' element={<NotFoundPage/>}/>
            <Route path='/403' element={<UnauthorizedPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;
