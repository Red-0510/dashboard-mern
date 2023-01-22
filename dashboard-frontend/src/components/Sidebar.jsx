import React,{useState,useEffect} from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";

import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    ShoppingCartOutlined,
    NoEncryption
}
 from "@mui/icons-material";
import { useLocation,useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import profileImage from "assets/profile.png";
import userEvent from '@testing-library/user-event';

const navItems = [
    {
        text:"Dashboard",
        icon:<HomeOutlined />
    },
    {
        text:"Client Facing",
        icon:null
    },{
        text:"Products",
        icon:<ShoppingCartOutlined />
    },{
        text:"Customers",
        icon:<Groups2Outlined />
    },{
        text:"Transaction",
        icon:<ReceiptLongOutlined />
    },{
        text:"Geography",
        icon:<PublicOutlined />
    },{
        text:"Sales",
        icon:null
    },{
        text:"Overview",
        icon:<PointOfSaleOutlined />
    },{
        text:"Daily",
        icon:<TodayOutlined />
    },{
        text:"Monthly",
        icon:<CalendarMonthOutlined />
    },{
        text:"Breakdown",
        icon:<PieChartOutlined />
    },{
        text:"Management",
        icon:null
    },{
        text:"Admin",
        icon:<AdminPanelSettingsOutlined />
    },{
        text:"Performance",
        icon:<TrendingUpOutlined />
    },

]

const Sidebar = ({
    drawerWidth, isSidebarOpen,setIsSidebarOpen, isNonMobile,user
}) => {

    const {pathname} = useLocation();
    const [active ,setActive] = useState("");
    const theme= useTheme();
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(pathname.substring(1));
        setActive(pathname.substring(1));
    },[pathname])

    return (
      <Box component="nav">
        {isSidebarOpen && 
            <Drawer
             open={isSidebarOpen}
             onClose={()=>setIsSidebarOpen(false)}
             variant="persistent"
             anchor='left'
             sx={{
                width:drawerWidth,
                overflowY:"scroll",
                "& .MuiDrawer-paper::-webkit-scrollbar":{
                    display:"none"
                },
                "& .MuiDrawer-paper":{
                    color:theme.palette.secondary[200],
                    backgroundColor:theme.palette.background.alt,
                    boxSizing:"border-box",
                    borderWidth: isNonMobile ? 0: "2px",
                    width:drawerWidth
                }
             }}
            >
                <Box width="100%">
                    <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexBetween color={theme.palette.secondary.main}>
                            <Box display="flex" alignItems="center" gap="0.5rem">
                                <Typography variant='h4' fontWeight="bold">ECOMVISION</Typography>
                            </Box>
                            {!isNonMobile && (
                                <IconButton onClick={()=>setIsSidebarOpen(!isSidebarOpen)}>
                                    <ChevronLeft />
                                </IconButton>
                            )}
                        </FlexBetween>
                    </Box>
                    <List>
                        {navItems.map(({text,icon})=>{
                            if(!icon){
                                return (
                                    <Typography key={text} sx={{m:"2.25rem 0 1rem 3rem"}}>{text}</Typography>
                                );
                            }
                            const lctext=text.toLowerCase();

                            return (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton
                                      onClick={()=>{
                                        navigate(`/${lctext}`);
                                        setActive(lctext);
                                      }}
                                      sx={{
                                        backgroundColor:active===lctext ? theme.palette.secondary[300] : "transparent",
                                        color: active === lctext ? 
                                                theme.palette.primary[600] 
                                                :theme.palette.secondary[200],
                                      }}
                                    >
                                        <ListItemIcon
                                          sx={{
                                            ml:"2rem",
                                            color: active === lctext ? theme.palette.primary[600] :
                                                theme.palette.secondary[200],
                                          }}
                                        >
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                        {active===lctext && <ChevronRightOutlined sx={{ml:"auto"}} />}
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                    <Box position="sticky" bottom="0" width="100%" sx={{
                        paddingBottom:"0.5rem",
                        backgroundColor:theme.palette.background.alt
                    }}>
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 1rem 0.5rem 1rem">
                            <Box 
                            component="img"
                            alt="profile"
                            src={profileImage}
                            height="40px"
                            width="40px"
                            borderRadius="50%"
                            sx={{objectFit:"cover"}}
                            />
                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize="0.9rem"
                                sx={{color:theme.palette.secondary[100]}} >
                                    {user.name}
                                </Typography>
                                <Typography fontSize="0.8rem"
                                sx={{color:theme.palette.secondary[200]}} >
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <SettingsOutlined 
                            sx={{
                                color:theme.palette.secondary[200],
                                fontSize:"25px",
                                }}
                            />
                        </FlexBetween>
                    </Box>
                </Box>
            </Drawer>
            }
      </Box>
    )
}

export default Sidebar