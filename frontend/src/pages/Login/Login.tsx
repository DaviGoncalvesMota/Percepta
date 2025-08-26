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
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, type MouseEvent } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { Brightness5, DarkMode } from "@mui/icons-material";
import { UserContext } from "../../context/User/UserContext";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { userRole, setUserRole } = useContext(UserContext);
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { authenticate, loading, error } = useAuthentication();

  const handleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const success = await authenticate({ email: email, password: password });

    if (success) {
      navigate("/");
    } else {
      alert("Usuário ou senha inválidos.");
    }
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Senha"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                onClick={handleSubmit}
                variant="contained"
                size="large"
                color="primary"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              {error && (
                <Typography variant="body2" color="error" textAlign="center">
                  {error}
                </Typography>
              )}

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
