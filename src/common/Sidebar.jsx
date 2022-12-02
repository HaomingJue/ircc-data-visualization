import { tokens } from "./theme";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import { getLocal } from "../service/localStorage";
import dateFormat from 'dateformat';
import { isFreeUser } from "../service/checkUserRole";
import { useLocation } from 'react-router-dom';

const Item = ({ title, to, icon, isDisabled = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let location = useLocation();
  return (
    <MenuItem
      active={!isDisabled && location.pathname === to}
      style={{
        color: !isDisabled && colors.grey[100],
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      {!isDisabled && <Link to={to} />}
    </MenuItem>
  );
};

const Sidebar = () => {

  let user = getLocal('user');

  var userExpireDate = dateFormat(user?.expireDate, 'yyyy-mm-dd')
  var today = dateFormat(new Date(), 'yyyy-mm-dd')
  const getUserRole = () => {
    if(user.role) {
      return 'Admin'
    }
    else if (userExpireDate > today) {
      return 'Premium'
    }
    else {
      return 'Free User'
    }
  }

  const getUserIconImage = () => {
    return "/user-icons/" + user.icon
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box 
      display={"flex"}
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 10px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.grey[100]}>
                  Home
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={getUserIconImage()}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "15px 0 10px 0" }}
                >
                  {user.username}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {getUserRole()}
                </Typography>
            
                 {getUserRole() === "Premium" && <Typography variant="h6" color={colors.redAccent[600]}>
                  Expires: {userExpireDate}
                </Typography>}
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "4%"}>
            <Item
              title="Dashboard"
              to="/home/dashboard"
              icon={<HomeOutlinedIcon />}
            />
           
              {(!isCollapsed && getUserRole() ==='Admin') && 
                <Typography
                  variant="h7"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Admin Space
                </Typography>
              }
              {  getUserRole() ==='Admin' &&
                <Box>
                <Item
                  title="Manage User"
                  to="/home/manage-user"
                  icon={<PeopleOutlinedIcon />}
                />
                <Item
                  title="Manage Records"
                  to="/home/manage-data"
                  icon={<ReceiptOutlinedIcon />}
                />
                </Box>
              }
            { !isCollapsed && <Typography
                variant="h7"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                General
              </Typography>
            }           
            <Item
              title="Profile"
              to="/home/profile"
              icon={<PersonOutlinedIcon />}
            />
            <Item
              title="Premium"
              to="/home/premium"
              icon={<AddCardOutlinedIcon />}
            />
            <Item
              title="FAQ Page"
              to="/home/faq"
              icon={<HelpOutlineOutlinedIcon />}
            />

            {!isCollapsed && <Typography
              variant="h7"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            }
            <Item
              title="Immigration Records"
              to="/home/data-form"
              icon={<CalendarTodayOutlinedIcon />}
            />
            <Item
              title="Destination Statistics"
              to="/home/bar-chart"
              icon={<BarChartOutlinedIcon />}
              isDisabled={isFreeUser()}
            />
            <Item
              title="Category Proportion"
              to="/home/pie-chart"
              icon={<PieChartOutlineOutlinedIcon />}
              isDisabled={isFreeUser()}
            />
            <Item
              title="Yearly Trends"
              to="/home/line-chart"
              icon={<TimelineOutlinedIcon />}
              isDisabled={isFreeUser()}
            />
            <Item
              title="Immigration Source"
              to="/home/geography-chart"
              icon={<MapOutlinedIcon />}
              isDisabled={isFreeUser()}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;