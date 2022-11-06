import { ThemeProvider } from "@emotion/react";
import { CssBaseline, useTheme } from "@mui/material";
import { ColorModeContext, useMode } from "../../common/theme";
import { Topbar } from "../../components/Topbar";
import  Sidebar from "../../components/Sidebar";
import { Dashboard } from "../../components/Dashboard";
import { Link } from "react-router-dom";
import { LoginPage } from "../login/login.page";
import { NotFoundPage } from "../not-found/not-found.page";
import { useState } from "react";
import { UnauthorizedPage } from "../unauthorized/unauthorized.page";




const HomePage = () => {
        const theme = useTheme();
        const [isSidebar, setIsSidebar] = useState(true);
      
        return (
            
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                    <Link to="/" element={<Dashboard />} />
                    <Link to="calendar" element={<UnauthorizedPage/>} />
                    {/* <Route path="/team" element={<Team />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/geography" element={<Geography />} /> */}
                </main>
              </div>

        );
      }

export default HomePage;