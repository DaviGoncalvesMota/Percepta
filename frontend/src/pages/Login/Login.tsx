import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../baseURL";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { Brightness5, DarkMode } from "@mui/icons-material";
import { UserContext } from "../../context/User/UserContext";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { userRole, setUserRole } = useContext(UserContext);
  const { themeMode, setThemeMode } = useContext(ThemeContext);

  const navigate = useNavigate()

  const authUser = () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!userRole) {
      alert("Por favor, selecione o tipo de usuário.");
      return;
    }

    const endpoint =
      userRole === "employer" ? "employers" : "companies";

    axios
      .get(`${baseURL}/${endpoint}?email=${email}&password=${password}`)
      .then((response) => {
        if (response.data.length > 0) {
          localStorage.setItem("user", JSON.stringify(response.data[0].id));
          navigate("/allfeedbacks/" + response.data[0].id)
        } else {
          alert("Usuário ou senha inválidos");
        }
      })
      .catch((error) => {
        console.error("Erro ao autenticar:", error);
        alert("Erro ao autenticar. Tente novamente.");
      });
  };

  const handleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "background.paper",
          position: "fixed",
          width: "100%",
          p: 1,
        }}
      >
        <IconButton size="large" onClick={handleTheme} color="inherit">
          {themeMode === "light" ? <DarkMode /> : <Brightness5 />}
        </IconButton>
      </Box>

      {/* Card de login */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.paper"
      >
        <Card
          sx={{
            width: 400,
            p: 4,
            borderRadius: 4,
            boxShadow: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              textAlign="center"
            >
              Percepta
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
              <Button
                onClick={() => setUserRole("employer")}
                variant={userRole === "employer" ? "contained" : "outlined"}
                color="primary"
              >
                Funcionário
              </Button>
              <Button
                onClick={() => setUserRole("company")}
                variant={userRole === "company" ? "contained" : "outlined"}
                color="primary"
              >
                Empresa
              </Button>
            </Stack>

            <Stack spacing={3} mt={3}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Senha"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={authUser}
                variant="contained"
                size="large"
                color="primary"
              >
                Entrar
              </Button>
              <Typography
                variant="body2"
                textAlign="center"
                color="text.secondary"
              >
                Não tem uma conta? <Link to="/register">Registrar</Link>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Login;
