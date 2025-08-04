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
import type { ICard } from "../../interfaces/ICard";
import { Link } from "react-router-dom";

const Card = ({
  id,
  rating,
  category,
  comment,
  date,
  reviewerName,
  revieweeName,
  userIdByParams,
}: ICard) => {
  
  return (
    <CardComponent
      sx={{
        maxWidth: 400,
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Review: <strong>{revieweeName}</strong>
          </Typography>

          <Typography variant="h6" fontWeight="bold">
            By: {reviewerName}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <Rating value={rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              {rating} stars
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mt: 1.5 }}>
            "{comment}"
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={2}>
            <CalendarToday sx={{ fontSize: 16 }} />
            <Typography variant="caption">{date}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Category sx={{ fontSize: 16 }} />
            <Typography variant="caption">Category: {category}</Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions>
        <Link
          to={`/details/${id}/${userIdByParams}`}
          style={{ textDecoration: "none" }}
        >
          <Button size="small"> Details </Button>
        </Link>
      </CardActions>
    </CardComponent>
  );
};

export default Card;
