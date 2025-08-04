import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "./components/Sidebar/Sidebar";
import { ThemeContext } from "./context/Theme/ThemeContext";
import { darkTheme, lightTheme } from "./styles/Theme";
import { useContext } from "react";
import AppBar from "./components/Appbar/Appbar";
import { OpenContext } from "./context/Open/OpenContext";

function App() {
  const { themeMode } = useContext(ThemeContext);
  const {open, setOpen} = useContext(OpenContext);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen}/>
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
    </ThemeProvider>
  );
}

export default App;
