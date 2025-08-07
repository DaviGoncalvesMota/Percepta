  import { Box, Typography } from "@mui/material";
  import FeedbackForm from "../../components/Forms/FeedbackForm";
  import { useParams } from "react-router-dom";

  const Feedback = () => {

    const isAuthenticated = localStorage.getItem("user");
    if (!isAuthenticated) {
      window.location.href = "/login";
    }

    const { id: userId } = useParams()  

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

        {userId && (
          <FeedbackForm userId={userId}/>
        )}
      </Box>
    );
  };

  export default Feedback;
