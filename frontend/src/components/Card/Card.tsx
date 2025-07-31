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
import type { CardProps } from "../../interfaces/ICardProps";

const Card = ({
  rating,
  category,
  comment,
  date,
  userName,
  enterprise,
}: CardProps) => {
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
            Enterprise: <strong>{enterprise}</strong>
          </Typography>

          <Typography variant="h6" fontWeight="bold">
            {userName}
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
            <Typography variant="caption">Category : {category}</Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions>
        <Button size="small"> Details </Button>
      </CardActions>
    </CardComponent>
  );
};

export default Card;
