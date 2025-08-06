import { Paper, Typography } from "@mui/material";

const Home = () => {
  const isAuthenticated = localStorage.getItem("user");
  if (!isAuthenticated) {
    window.location.href = "/login";
  }

  return (
    <>
      <Paper elevation={3} style={{ padding: "40px", margin: "20px" }}>
        <Typography align="center" variant="h4">
          {" "}
          Bem-Vindo ao Percepta
        </Typography>
        <Typography align="center" variant="h6">
          {" "}
          Seu melhor site para feedbacks.{" "}
        </Typography>
      </Paper>
      <br />
    </>
  );
};

export default Home;
