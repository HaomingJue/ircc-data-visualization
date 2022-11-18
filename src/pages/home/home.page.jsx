import { ThemeProvider } from "@emotion/react";
import { CssBaseline, useTheme } from "@mui/material";
import { ColorModeContext, useMode } from "../../common/theme";
import  Topbar  from "../../common/Topbar";
import  Sidebar from "../../common/Sidebar";
import { Link, Outlet } from "react-router-dom";
import { LoginPage } from "../login/login.page";
import { NotFoundPage } from "../not-found/not-found.page";
import { useState } from "react";
import { UnauthorizedPage } from "../unauthorized/unauthorized.page";
import UserGridPage from "./manage-user/manage-user";




const HomePage = () => {
        const theme = useTheme();
        const [isSidebar, setIsSidebar] = useState(true);
      
        return (
            
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Outlet />
                </main>
              </div>

        );
      }

export default HomePage;