import {
  DashboardOutlined,
  Delete,
  Edit,
  FilterAlt,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  MenuItem,
  Menu,
  Chip,
  Divider,
  Avatar,
  Button,
  Rating,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { IFeedback } from "../../interfaces/IFeedback";
import { UserContext } from "../../context/User/UserContext";
import axios from "axios";
import { companyCategories, employeeCategories } from "../../data/categories";
import React from "react";
import Dialog from "../../components/Dialog/Dialog";
import { useFetchFeedbacks } from "../../hooks/useFetchFeedbacks";

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);

  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const { userId } = useParams();
  const [allReviewerFeedbacks, setAllReviewerFeedbacks] = useState<IFeedback[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialog, setDialog] = useState<React.ReactNode>();
  const open = Boolean(anchorEl);

  const {
    getRevieweeFeedbacks,
    revieweeFeedbacks,
    setRevieweeFeedbacks,
    getReviewerFeedbacks,
    reviewerFeedbacks,
    setReviewerFeedbacks
  } = useFetchFeedbacks(userId!);

  useEffect(() => {
    const fetchData = async () => {
      await getRevieweeFeedbacks();
      await getReviewerFeedbacks();
    };
    fetchData();
  }, [userId, getRevieweeFeedbacks, getReviewerFeedbacks]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      setReviewerFeedbacks(
        allReviewerFeedbacks.filter((feedback) =>
          selectedCategories.includes(feedback.category)
        )
      );
    } else {
      setReviewerFeedbacks(allReviewerFeedbacks);
    }
  }, [selectedCategories, allReviewerFeedbacks, setReviewerFeedbacks]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev : [...prev, category]
    );
    handleClose();
  };

  const handleDeleteChip = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  // const handleDeleteFeedback = (id: string) => {
  //   try {
  //     axios.delete(`${baseURL}/feedbacks/${id}`).then(() => {
  //       window.location.reload();
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const categories =
    userRole === "company" ? employeeCategories : companyCategories;

  return (
    <>
      {dialog}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
        mb={2}
      >
        <DashboardOutlined fontSize="large" color="primary" />
        <Typography variant="h4" fontWeight="bold">
          Minha Dashboard
        </Typography>
      </Box>

      <Typography variant="h6" color="text.secondary" align="center" mb={4}>
        Aqui você pode acompanhar suas avaliações e analisar os feedbacks por
        categoria e tipo.
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "flex-end",
          mb: 5,
        }}
      >
        {selectedCategories.map((category, index) => (
          <Chip
            key={index}
            label={category}
            onDelete={() => handleDeleteChip(category)}
          />
        ))}

        <IconButton onClick={handleClick}>
          <FilterAlt sx={{ fontSize: "2rem" }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 200,
              overflowY: "auto",
            },
          }}
        >
          {categories.map((category, index) => (
            <MenuItem
              key={index}
              value={category}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </MenuItem>
          ))}
        </Menu>

        <TextField
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar Comentário"
          sx={{ width: "25%" }}
          value={searchText}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          mb: 3,
        }}
      >
        <ThumbUp color="primary" fontSize="medium" />
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            letterSpacing: 1,
            color: "primary.main",
            mt: 0.5,
          }}
        >
          Minhas Avaliações
        </Typography>
        <ThumbDown color="primary" fontSize="medium" />
      </Box>

      {reviewerFeedbacks.length > 0 ? (
        reviewerFeedbacks
          .filter((f) =>
            f.comment?.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((feedback, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pb: "1%",
                }}
              >
                {/* Esquerda */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar src={feedback.revieweeAvatar} />
                  <Typography>
                    <strong>{feedback.revieweeName}</strong>
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <strong>Nota:</strong>{" "}
                  <Rating
                    value={feedback.rating}
                    precision={0.5}
                    readOnly
                    size="medium"
                  />
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Link to={`/details/${feedback.id}/${userId}`}>
                    <Button sx={{ mt: 0.5 }}> Detalhes </Button>
                  </Link>
                  <IconButton
                    onClick={() =>
                      setDialog(
                        <Dialog
                          onClose={() => setDialog(false)}
                          label="dashboard"
                          userId={userId}
                          onSubmit={(updatedUser) => updatedUser}
                          feedbackId={feedback.id}
                        />
                      )
                    }
                  >
                    <Edit />
                  </IconButton>
                  <IconButton>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />
            </React.Fragment>
          ))
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Você ainda não avaliou ninguém
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Comece a compartilhar suas opiniões e ajude outras pessoas!
          </Typography>

          <Button
            component={Link}
            to={`/feedback/${userId}`}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Avaliar Agora
          </Button>
        </Box>
      )}
    </>
  );
};

export default Dashboard;


// onClick={() => handleDeleteFeedback(feedback.id)}