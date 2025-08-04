import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../baseURL";
import Card from "../../components/Card/Card";
import type { ICard } from "../../interfaces/ICard";
import { useParams } from "react-router-dom";

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<ICard[]>([]);

  const userIdByParams = useParams().id;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        axios
          .get(baseURL + "/feedbacks")
          .then((res) => {
            setFeedbacks(res.data);
          })
          .catch((err) => console.error("Error fetching feedbacks:", err));
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align="center">
          {" "}
          Todos os Feedbacks{" "}
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: 2 }}>
          Aqui estão todos os feedbacks das empresas.
        </Typography>

        <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
          {feedbacks.length > 0 ? (
            feedbacks.filter((e) => e.category == "empresa").map((feedback: ICard, index) => {
              return (
                <Card
                  id={feedback.id}
                  category={feedback.category}
                  rating={feedback.rating}
                  comment={feedback.comment}
                  date={feedback.date}
                  reviewerName={feedback.reviewerName}
                  revieweeName={feedback.revieweeName}
                  userIdByParams={userIdByParams}
                  reviewerId={feedback.reviewerId}
                  positivePoint={feedback.positivePoint}
                  negativePoint={feedback.negativePoint}
                  revieweeId={feedback.revieweeId}
                  reviewerRole={feedback.reviewerRole}
                  revieweeRole={feedback.revieweeRole}
                  key={index}
                />
              );
            })
          ) : (
            <Typography variant="body2" color="text.secondary" align="center">
              Sem feedbacks disponíveis no momento.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AllFeedbacks;
