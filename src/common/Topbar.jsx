import { Box, Button, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../common/theme";
import InputBase from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import  SearchIcon from "@mui/icons-material/Search";
import { PersonalVideoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";



const Topbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        /* To do: Implement logout service*/
        navigate("/")
    }


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <Box display="flex" justifyContent="flex-end" padding={2}>
            {/* Purchase Button */}
            <Box
                display="flex"
                backgroundColor={colors.greenAccent[500]}
                borderRadius="3px"
            >
                <Button>Get Premium</Button>
            </Box>

            {/* Icon Bar */}
            <Box display="flex">
                <Box display="flex">
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlinedIcon></DarkModeOutlinedIcon>
                        ): <LightModeOutlinedIcon></LightModeOutlinedIcon>}
                    </IconButton>
                </Box>
                <Box display="flex"> 
                    <IconButton onClick={colorMode.toggleColorMode}>
                        <PersonOutlinedIcon/>
                    </IconButton>
                </Box>
                <Box display="flex">
                    <IconButton onClick={handleLogout}>
                        <LogoutOutlinedIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Topbar;