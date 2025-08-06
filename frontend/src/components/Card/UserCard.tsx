import { Card, Typography, Avatar, Button, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import type { ICompanyCard } from "../../interfaces/ICard";
import { useContext } from "react";
import { ReviewContext } from "../../context/Review/ReviewContext";

const UserCard = ({ name, logo, userId, revieweeId }: ICompanyCard) => {
  const { setRevieweeName, setRevieweeId } = useContext(ReviewContext);

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
        maxWidth: 350,
        minHeight: 100,
        bgcolor: "background.paper",
      }}
    >
      <Avatar src={logo} alt={name} sx={{ width: 56, height: 56, mr: 2 }} />

      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={1}>
          <Typography variant="subtitle1" fontWeight="600">
            {name}
          </Typography>

          <Button
            variant="contained"
            size="small"
            sx={{ width: "fit-content" }}
            component={Link}
            onClick={() => {
              setRevieweeName(name);
              setRevieweeId(revieweeId);
            }}
            to={"/feedback/" + userId}
          >
            Selecionar
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default UserCard;
