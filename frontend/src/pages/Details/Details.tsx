import {
  Card as CardComponent,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Rating,
  Stack,
  Divider,
} from "@mui/material";
import { Category, CalendarToday } from "@mui/icons-material";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { useContext, useEffect, useState } from "react";
import type { IFeedbackCard } from "../../interfaces/ICard";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/User/UserContext";

const Details = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);

  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const [feedback, setFeedback] = useState<IFeedbackCard | null>(null);
  const id = useParams().id;

  useEffect(() => {
    axios
      .get(baseURL + "/feedbacks/" + id)
      .then((res) => {
        setFeedback(res.data);
      })
      .catch((err) => console.error("Erro ao carregar detalhes:", err));
  }, [id]);

  if (!feedback) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align="center">
          Carregando os detalhes do feedback...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: "auto" }}>
      <CardComponent
        sx={{
          borderRadius: 4,
          boxShadow: 4,
          bgcolor: "background.paper",
          p: 3,
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            <Typography
              align="center"
              variant="h5"
              fontWeight="bold"
              gutterBottom
            >
              Avaliação para: {feedback.revieweeName}
            </Typography>

            <Typography
              align="center"
              variant="subtitle1"
              color="text.secondary"
            >
              Por: {feedback.reviewerName}
            </Typography>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Rating value={feedback.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                {feedback.rating} Estrelas
              </Typography>
            </Box>

            <Divider />

            <Typography align="center" variant="body1" fontStyle="italic">
              "{feedback.comment}"
            </Typography>

            <Divider />

            <Box>
              <Typography variant="subtitle2" color="success.main">
                <strong>Ponto Positivo:</strong>
              </Typography>
              <Typography variant="body2">{feedback.positivePoint}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="error.main">
                <strong>Ponto Negativo:</strong>
              </Typography>
              <Typography variant="body2">{feedback.negativePoint}</Typography>
            </Box>

            <Divider />

            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
              <Box display="flex" alignItems="center" gap={1}>
                <CalendarToday sx={{ fontSize: 16 }} />
                <Typography variant="caption">
                  {new Date(feedback.date).toLocaleDateString()}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Category sx={{ fontSize: 16 }} />
                <Typography variant="caption">
                  Categoria: {feedback.category}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: "center", marginTop: 2 }}>
          <Button
            onClick={() => navigate(-1)}
            variant="contained"
            color="primary"
          >
            Voltar
          </Button>
        </CardActions>
      </CardComponent>
    </Box>
  );
};

export default Details;
