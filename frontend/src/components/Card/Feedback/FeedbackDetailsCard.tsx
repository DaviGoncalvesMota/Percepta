import {
  Box,
  Button,
  CardActions,
  CardContent,
  Divider,
  Rating,
  Stack,
  Typography,
  Card as CardComponent,
} from "@mui/material";
import type { IFeedback } from "../../../interfaces/IFeedback";
import { CalendarToday, Category } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FeedbackDetailsCard = ({
  category,
  comment,
  date,
  negativePoint,
  positivePoint,
  rating,
  reviewerName,
  revieweeName,
}: IFeedback) => {
  const navigate = useNavigate();

  return (
    <>
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
              Avaliação para: {revieweeName}
            </Typography>

            <Typography
              align="center"
              variant="subtitle1"
              color="text.secondary"
            >
              Por: {reviewerName}
            </Typography>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Rating value={rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                {rating} Estrelas
              </Typography>
            </Box>

            <Divider />

            <Typography align="center" variant="body1" fontStyle="italic">
              "{comment}"
            </Typography>

            <Divider />

            <Box>
              <Typography variant="subtitle2" color="success.main">
                <strong>Ponto Positivo:</strong>
              </Typography>
              <Typography variant="body2">{positivePoint}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="error.main">
                <strong>Ponto Negativo:</strong>
              </Typography>
              <Typography variant="body2">{negativePoint}</Typography>
            </Box>

            <Divider />

            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
              <Box display="flex" alignItems="center" gap={1}>
                <CalendarToday sx={{ fontSize: 16 }} />
                <Typography variant="caption">
                  {new Date(date).toLocaleDateString()}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Category sx={{ fontSize: 16 }} />
                <Typography variant="caption">Categoria: {category}</Typography>
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
    </>
  );
};

export default FeedbackDetailsCard;
