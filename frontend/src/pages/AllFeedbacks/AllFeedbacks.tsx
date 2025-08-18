import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseURL } from "../../baseURL";
import type { IFeedbackCard } from "../../interfaces/ICard";
import { useNavigate, useParams } from "react-router-dom";
import FeedbackCard from "../../components/Card/FeedbackCard";
import { UserContext } from "../../context/User/UserContext";

const AllFeedbacks = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);

  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const [feedbacks, setFeedbacks] = useState<IFeedbackCard[]>([]);

  const { userId } = useParams();

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

        <Box
          sx={{
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {feedbacks.length > 0 ? (
            feedbacks
              .filter((e) => e.revieweeRole == "company")
              .map((feedback: IFeedbackCard, index) => {
                return (
                  <FeedbackCard
                    id={feedback.id}
                    rating={feedback.rating}
                    category={feedback.category}
                    comment={feedback.comment}
                    date={feedback.date}
                    reviewerName={feedback.reviewerName}
                    revieweeName={feedback.revieweeName}
                    userId={userId}
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
