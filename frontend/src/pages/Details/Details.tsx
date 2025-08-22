import { Typography, Box } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/User/UserContext";
import { useFetchFeedbacks } from "../../hooks/useFetchFeedbacks";
import FeedbackDetailsCard from "../../components/Card/Feedback/FeedbackDetailsCard";

const Details = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);

  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const { id } = useParams();

  const { getFeedbacks, feedbacks, loading, error } = useFetchFeedbacks(id);

  useEffect(() => {
    const fetchData = async () => {
      await getFeedbacks();
    };
    fetchData();
  }, [getFeedbacks]);

  if (loading) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align="center">
          Carregando os detalhes do feedback...
        </Typography>
      </Box>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: "auto" }}>
      {feedbacks.length > 0 &&
        feedbacks.map((feedback) => (
          <>
            <FeedbackDetailsCard
              category={feedback.category}
              comment={feedback.comment}
              date={feedback.date}
              negativePoint={feedback.negativePoint}
              positivePoint={feedback.positivePoint}
              rating={feedback.rating}
              revieweeName={feedback.revieweeName}
              reviewerName={feedback.reviewerName}
              id={feedback.id}
              revieweeId={feedback.revieweeId}
              reviewerId={feedback.reviewerId}
              revieweeRole={feedback.revieweeRole}
              reviewerRole={feedback.reviewerRole}
            />
          </>
        ))}
    </Box>
  );
};

export default Details;
