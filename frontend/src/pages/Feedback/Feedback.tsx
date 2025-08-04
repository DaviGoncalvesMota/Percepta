import { Box, Typography } from "@mui/material";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { useState } from "react";
import Forms from "../../components/Forms/Forms";

const Feedback = () => {
  const [enterprises, setEterprises] = useState([]);

  const categories = [
    "Atendimento",
    "Produto",
    "Serviço",
    "Suporte Técnico",
    "Outros",
  ];

  axios
    .get(baseURL + "/enterprises")
    .then((res) => {
      setEterprises(res.data);
    })
    .catch((err) => console.error("Error fetching users:", err));

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

      <br />

      <Forms enterprises={enterprises} categories={categories} />
    </Box>
  );
};

export default Feedback;
