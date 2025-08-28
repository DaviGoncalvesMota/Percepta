import { Box } from "@mui/material";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/User/UserContext";
import FeedbackDetailsCard from "../../components/Card/Feedback/FeedbackDetailsCard";
import { useFetchFeedbackDetails } from "../../hooks/Actions/Get/Feedbacks/useFetchFeedbackDetails";
import LoadingScreen from "../../components/Loading/LoadingScreen";

const Details = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("userId");
  const { userRole } = useContext(UserContext);

  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const { id } = useParams();

  const { data: feedback, loading, error } = useFetchFeedbackDetails(id!);

  if (loading) {
    <LoadingScreen />;
  }

  if (error) return <p>{error}</p>;

  return (
    <Box sx={{ padding: 2, maxWidth: 600, maxHeight: 500 , margin: "auto" }}>
      {feedback.length > 0 &&
        feedback.map((feedback) => (
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
              revieweeAvatar={feedback.revieweeAvatar}
            />
          </>
        ))}
    </Box>
  );
};

export default Details;
