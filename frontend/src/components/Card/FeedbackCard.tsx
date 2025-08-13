import {
  Card as CardComponent,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Rating,
  Stack,
} from "@mui/material";
import { Category, CalendarToday } from "@mui/icons-material";
import type { IFeedbackCard } from "../../interfaces/ICard";
import { Link } from "react-router-dom";

const FeedbackCard = ({
  id,
  rating,
  category,
  comment,
  date,
  reviewerName,
  revieweeName,
  userIdByParams,
}: IFeedbackCard) => {
  return (
    <CardComponent
      sx={{
        width: 400, // largura fixa
        height: 300, // altura fixa
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Por: <strong>{reviewerName}</strong>
          </Typography>

          <Typography variant="h6" fontWeight="bold">
            <strong>{revieweeName}</strong>
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <Rating value={rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              {rating} Estrelas
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              mt: 1.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2, // limite de linhas
              WebkitBoxOrient: "vertical",
            }}
          >
             "{comment.slice(0, 35)}{comment.length > 35 ? "..." : ""}"
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt="auto">
            <CalendarToday sx={{ fontSize: 16 }} />
            <Typography variant="caption">{date}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Category sx={{ fontSize: 16 }} />
            <Typography variant="caption">Categoria: {category}</Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions>
        <Link
          to={`/details/${id}/${userIdByParams}`}
          style={{ textDecoration: "none" }}
        >
          <Button size="small">Detalhes</Button>
        </Link>
      </CardActions>
    </CardComponent>
  );
};

export default FeedbackCard;
