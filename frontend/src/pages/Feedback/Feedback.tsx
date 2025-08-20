import { Box, Typography } from "@mui/material";
import FeedbackForm from "../../components/Forms/FeedbackForm";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/User/UserContext";

const Feedback = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);

  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const { userId } = useParams();

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 4,
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: "background.paper",
      }}
    >
      <Typography align="center" variant="h4" gutterBottom>
        Deixe seu Feedback
      </Typography>
      <Typography align="center" variant="body1" gutterBottom>
        Sua opinião é muito importante!
      </Typography>
 
      {userId && <FeedbackForm onClose={() => {}} label="feedback" userId={userId} />}
    </Box>
  );
};

export default Feedback;
