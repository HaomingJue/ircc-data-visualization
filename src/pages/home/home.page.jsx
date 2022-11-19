import {  useTheme } from "@mui/material";
import  Topbar  from "../../common/Topbar";
import  Sidebar from "../../common/Sidebar";
import {  Outlet } from "react-router-dom";
import { useState } from "react";




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