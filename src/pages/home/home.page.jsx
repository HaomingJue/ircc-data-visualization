import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "../../common/theme";
import { Topbar } from "../../components/Topbar";
import { Sidebar } from "../../components/Sidebar";
import { Dashboard } from "../../components/Dashboard";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../login/login.page";
import { NotFoundPage } from "../not-found/not-found.page";


const HomePage = () => {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="dashboard">
                    <main className="context">
                        <Topbar></Topbar>
                        <Routes>
                            <Route path="/l" element={<LoginPage/>} />
                            <Route path='*' element={<NotFoundPage/>}/>
                        </Routes> 
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export { HomePage };