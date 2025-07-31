import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../baseURL";
import Card from "../../components/Card/Card";
import type { ICardProps } from "../../interfaces/ICardProps";

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<ICardProps[]>([]);

  useEffect(() => {
    axios
      .get(baseURL + "/feedbacks")
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, []);

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align="center">
          {" "}
          All Feedbacks{" "}
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: 2 }}>
          Here you can view all the feedbacks submitted.
        </Typography>
        {/* Placeholder for feedbacks list */}
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback: CardProps, index) => (
            <Card
              category={feedback.category}
              rating={feedback.rating}
              comment={feedback.comment}
              date={feedback.date}
              userName={feedback.userName}
              enterprise={feedback.enterprise}
              key={index}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" align="center">
            No feedbacks available at the moment.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default AllFeedbacks;
