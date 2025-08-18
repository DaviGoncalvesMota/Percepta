import { Paper, Typography, Box, Button } from "@mui/material";
import { EmojiPeople } from "@mui/icons-material";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User/UserContext";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);

  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const { themeMode } = useContext(ThemeContext);

  const verifyTheme = themeMode == "light" ? "black" : "white";

  return (
    <Box
      sx={{
        maxHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "top",
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 4, sm: 6 },
          maxWidth: 600,
          width: "100%",
          bgcolor:
            themeMode == "light" ? "background.default" : "background.paper",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <EmojiPeople
          sx={{
            fontSize: 60,
            color: verifyTheme,
            mb: 2,
          }}
        />
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: verifyTheme,
          }}
        >
          Bem-vindo ao Percepta
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Seu melhor site de Avaliação.
        </Typography>
        <br />
        <Button
          component={Link}
          to={"/allfeedbacks/" + isAuthenticated}
          variant="contained"
        >
          {" "}
          Ir para Feedbacks{" "}
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;
