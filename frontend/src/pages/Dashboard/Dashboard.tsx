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
import { UserContext } from "../../context/User/UserContext";
import React from "react";
import Dialog from "../../components/Dialog/Dialog";
import { useCategories } from "../../hooks/Common/useCategories";
import { useFetchReviewerFeedbacks } from "../../hooks/Actions/Get/Feedbacks/useFetchReviewerFeedbacks";
import type { IFeedback } from "../../interfaces/IFeedback";
import { useDeleteFeedback } from "../../hooks/Actions/Delete/useDeleteFeedback";
import LoadingScreen from "../../components/Loading/LoadingScreen";

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("userId");
  const { userRole } = useContext(UserContext);

  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const categories = useCategories();
  const { userId } = useParams();
  const {
    data: reviewerFeedbacks,
    loading: loadingReviewerFeedbacks,
    error: errorOnFetchReviewerFeedbacks,
  } = useFetchReviewerFeedbacks(userId || "");
  const {
    delFeedback,
    loading: loadingNewFeedbackList,
    error: errorOnDeleteFeedback,
  } = useDeleteFeedback();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialog, setDialog] = useState<React.ReactNode>();
  const open = Boolean(anchorEl);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<IFeedback[]>([]);

  if (loadingReviewerFeedbacks) {
    <LoadingScreen />;
  }

  useEffect(() => {
    if (selectedCategories.length > 0) {
      setFilteredFeedbacks(
        reviewerFeedbacks.filter((feedback) =>
          selectedCategories.includes(feedback.category)
        )
      );
    } else {
      setFilteredFeedbacks(reviewerFeedbacks);
    }
  }, [selectedCategories, reviewerFeedbacks]);

  if (errorOnFetchReviewerFeedbacks)
    return <p>{errorOnFetchReviewerFeedbacks}</p>;

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

  const handleDeleteFeedback = (id: string) => {
    try {
      if (loadingNewFeedbackList) {
        <LoadingScreen />;
      }
      delFeedback(id).then((success) => {
        if (success) {
          window.location.reload();
        } else {
          alert("Erro ao deletar feedback. Tente novamente.");
        }
      });
    } catch (err) {
      console.log(err, errorOnDeleteFeedback);
      alert("Erro ao deletar feedback. Tente novamente.");
    }
  };

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
      {filteredFeedbacks.length > 0 ? (
        filteredFeedbacks
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

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    position: "fixed",
                    left: "40%",
                    transform: "translateX(-50%)",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  <strong>Nota:</strong>{" "}
                  <Rating
                    value={feedback.rating}
                    precision={0.5}
                    readOnly
                    size="medium"
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    left: "60%",
                    position: "fixed",
                  }}
                >
                  <strong style={{ width: 100 }}>Categoria:</strong>
                  <Chip label={feedback.category} color="primary" />
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
                  <IconButton
                    onClick={() => {
                      handleDeleteFeedback(feedback.id);
                    }}
                  >
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
