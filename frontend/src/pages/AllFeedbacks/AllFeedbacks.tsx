import { Box, Typography } from "@mui/material";

const AllFeedbacks = () => {  
  return (
    <>
      <Box sx={{ padding: 2 }}>
       <Typography variant="h4" align="center"> All Feedbacks </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: 2 }}>
          Here you can view all the feedbacks submitted.
        </Typography>
      </Box>
    </>
  );
};

export default AllFeedbacks;
