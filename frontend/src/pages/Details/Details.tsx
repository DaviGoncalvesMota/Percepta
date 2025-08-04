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
import axios from "axios";
import { baseURL } from "../../baseURL";
import { useEffect, useState } from "react";
import type { ICard } from "../../interfaces/ICard";
import { Link, useParams } from "react-router-dom";

const Details = () => {
  const [feedback, setFeedback] = useState<ICard | null>(null);
  const id = useParams().id;
  const userId = useParams().userId;

  useEffect(() => {
    axios
      .get(baseURL + "/feedbacks/" + id)
      .then((res) => {
        setFeedback(res.data);
      })
      .catch((err) => console.error("Error fetching feedback details:", err));
  }, [id]);

  if (!feedback) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align="center">
          Loading feedback details...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ padding: 2, maxWidth: 400, margin: "auto" }}>
        {feedback && (
          <CardComponent
            sx={{
              maxWidth: 400,
              maxHeight: "100%",
              borderRadius: 3,
              boxShadow: 3,
              p: 2,
              bgcolor: "background.paper",
            }}
          >
            <CardContent
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Stack spacing={1}>
                <Typography
                  align="center"
                  variant="subtitle2"
                  color="text.secondary"
                >
                  Review: <strong>{feedback.revieweeName}</strong>
                </Typography>

                <Typography align="center" variant="h6" fontWeight="bold">
                  By: {feedback.reviewerName}
                </Typography>

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <Rating
                    value={feedback.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    {feedback.rating} stars
                  </Typography>
                </Box>

                <Typography align="center" variant="body1">
                  "{feedback.comment}"
                </Typography>

                <br />

                <Typography variant="body1" align="center">
                  <strong>Positive Point:</strong>
                  <br />
                  {feedback.positivePoint}
                </Typography>

                <br />

                <Typography align="center" variant="body1">
                  <strong>Negative Point:</strong>
                  <br />
                  {feedback.negativePoint}
                </Typography>

                <br />

                <Box display="flex" alignItems="center" gap={1} mt={2}>
                  <CalendarToday sx={{ fontSize: 16 }} />
                  <Typography variant="caption">{feedback.date}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Category sx={{ fontSize: 16 }} />
                  <Typography variant="caption">
                    Category : {feedback.category}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>

            <CardActions sx={{ justifyContent: "center" }}>
              <Link to={`/allfeedbacks/${userId}`} style={{ textDecoration: "none" }}>
                <Button size="small"> Voltar </Button>
              </Link>
            </CardActions>
          </CardComponent>
        )}
      </Box>
    </>
  );
};

export default Details;
