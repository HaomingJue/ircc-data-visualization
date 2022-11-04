import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../common/theme";
import InputBase from "@mui/material";
import  LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import  DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import  NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import  SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import  PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import  SearchIcon from "@mui/icons-material/Search";
import { PersonalVideoOutlined } from "@mui/icons-material";


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <Box display="flex" justifyContent="flex-end" padding={2}>

            {/* Icon Bar */}
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
        </Box>
    );
};

export  {Topbar};