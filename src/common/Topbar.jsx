import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../common/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from "react-router-dom";


const Topbar = ({showLightButton = true,
                showProfileButton = true,
                showLogoutButton = true}) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        /* To do: Implement logout service*/
        navigate("/")
    }


    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <Box display="flex" justifyContent="flex-end" padding={2}>

            {/* Icon Bar */}
            <Box display="flex">
                {showLightButton && 
                <Box display="flex">
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlinedIcon></DarkModeOutlinedIcon>
                        ): <LightModeOutlinedIcon></LightModeOutlinedIcon>}
                    </IconButton>
                </Box>
                }
                {showProfileButton && 
                <Box display="flex"> 
                    <IconButton onClick={colorMode.toggleColorMode}>
                        <PersonOutlinedIcon/>
                    </IconButton>
                </Box>
                }
                {showLogoutButton &&
                <Box display="flex">
                    <IconButton onClick={handleLogout}>
                        <LogoutOutlinedIcon/>
                    </IconButton>
                </Box>
                }
            </Box>
        </Box>
    );
};

export default Topbar;