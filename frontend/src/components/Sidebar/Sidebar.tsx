import { useTheme } from "@mui/material/styles";
import SidebarLists from "./components/SidebarLists/SidebarLists";
import { ChevronRight } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { Drawer, DrawerHeader } from "../../styles/styles";
import type { ISidebar } from "../../interfaces/ISidebar";
import {
  Box,
  Divider,
  CssBaseline,
  IconButton,
  Typography,
} from "@mui/material";

const Sidebar = ({open, handleDrawerClose}: ISidebar) => {
  const theme = useTheme();


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
          <Typography sx={{marginRight: "20%"}} variant="h6" noWrap component="div">
            Percepta
          </Typography>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <SidebarLists />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Sidebar;
