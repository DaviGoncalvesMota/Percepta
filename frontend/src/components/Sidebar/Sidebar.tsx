import { useTheme } from "@mui/material/styles";
import SidebarLists from "./SidebarLists/SidebarLists";
import { ChevronRight } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { Drawer, DrawerHeader } from "../../styles/styles";
import type { SidebarProps } from "../../interfaces/SidebarProps";
import {
  Box,
  Divider,
  CssBaseline,
  IconButton,
} from "@mui/material";

const Sidebar = ({open, handleDrawerClose}: SidebarProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
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
