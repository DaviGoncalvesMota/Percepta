import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import type { IFeedback } from "../../interfaces/IFeedback";
import { useNavigate, useParams } from "react-router-dom";
import FeedbackSimpleCard from "../../components/Card/Feedback/FeedbackSimpleCard";
import { UserContext } from "../../context/User/UserContext";
import { useFetchFeedbacks } from "../../hooks/useFetchFeedbacks";

const AllFeedbacks = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data: feedbacks, loading, error } = useFetchFeedbacks();
  const { userRole } = useContext(UserContext);

  useEffect(() => {
    if (!userId || !userRole) {
      navigate("/login");
    }
  }, [userRole, navigate, userId]);


  if (loading) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align="center">
          Carregando...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center">
        Todos os Feedbacks
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
        {feedbacks && feedbacks.length > 0 ? (
          feedbacks
            .filter((e) => e.revieweeRole === "company")
            .map((feedback: IFeedback, index) => (
              <FeedbackSimpleCard
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
                revieweeAvatar={feedback.revieweeAvatar}
                key={index}
              />
            ))
        ) : (
          <Typography variant="body2" color="text.secondary" align="center">
            Sem feedbacks disponíveis no momento.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AllFeedbacks;
