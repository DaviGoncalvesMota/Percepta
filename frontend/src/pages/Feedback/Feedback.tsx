import { Box, Typography } from "@mui/material";
import Forms from "../../components/Forms/Forms";
import { useParams } from "react-router-dom";

const Feedback = () => {

  const isAuthenticated = localStorage.getItem("user");
  if (!isAuthenticated) {
    window.location.href = "/login";
  }

  const userId = useParams().id


  const categories = [
    "Atendimento",
    "Produto",
    "Serviço",
    "Suporte Técnico",
    "Outros",
  ];

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 4,
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: "background.paper",
      }}
    >
      <Typography align="center" variant="h4" gutterBottom>
        Deixe seu Feedback
      </Typography>
      <Typography align="center" variant="body1" gutterBottom>
        Sua opinião é muito importante!
      </Typography>

      <Forms categories={categories} userId={userId}/>
    </Box>
  );
};

export default Feedback;
