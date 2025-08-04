import { Toolbar, IconButton, Typography, Box } from "@mui/material";
import { AppBar as AppBarComponent } from "../../styles/styles";
import { Brightness5, DarkMode, Menu } from "@mui/icons-material";
import { darkTheme, lightTheme } from "../../styles/Theme";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";

interface AppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const AppBar = ({ open, handleDrawerOpen }: AppBarProps) => {
  const { themeMode, setThemeMode } = useContext(ThemeContext);

  const handleTheme = () => {
    setThemeMode((prevMode) =>
      prevMode === darkTheme.palette.mode
        ? lightTheme.palette.mode
        : darkTheme.palette.mode
    );
  };

  return (
    <>
      <AppBarComponent position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <Menu />
          </IconButton>
          {!open && (
            <Typography variant="h6" noWrap component="div">
              Percepta
            </Typography>
          )}
          <Box
            sx={{ justifyContent: "flex-end", flexGrow: 1, display: "flex" }}
          >
            <IconButton color="inherit" onClick={handleTheme}>
              {themeMode === "light" ? <DarkMode /> : <Brightness5 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBarComponent>
      ;
    </>
  );
};

export default AppBar;
