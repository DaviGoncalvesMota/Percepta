import {
  DashboardOutlined,
  Delete,
  Edit,
  FilterAlt,
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
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { IFeedbackCard } from "../../interfaces/ICard";
import { UserContext } from "../../context/User/UserContext";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { companyCategories, employeeCategories } from "../../data/categories";
import React from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);
  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const { id: userId } = useParams();
  const [revieweeFeedbacks, setRevieweeFeedbacks] = useState<IFeedbackCard[]>(
    []
  );
  const [reviewerFeedbacks, setReviewerFeedbacks] = useState<IFeedbackCard[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectedCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories((prev) => [...prev, category]);
    }
    handleClose();
  };

  const handleDeleteChip = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const categories =
    userRole === "company" ? companyCategories : employeeCategories;

  useEffect(() => {
    const revieweeFeedbacks = async () => {
      axios
        .get(baseURL + "/feedbacks?revieweeId=" + userId)
        .then((response) => {
          setRevieweeFeedbacks(response.data);
        });
    };

    const reviewerFeedbacks = async () => {
      axios
        .get(baseURL + "/feedbacks?reviewerId=" + userId)
        .then((response) => {
          setReviewerFeedbacks(response.data);
        });
    };

    revieweeFeedbacks();
    reviewerFeedbacks();
  }, [userId]);

  return (
    <Box>
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
        {selectedCategories.map((category) => (
          <Chip
            key={category}
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
          {categories.map((option, index) => (
            <MenuItem
              key={index}
              value={option}
              onClick={() => handleSelectedCategory(option)}
            >
              {option}
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

      {reviewerFeedbacks.length > 0 ? (
        reviewerFeedbacks.map((feedback) => (
          <>
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
                <Avatar />
                <Typography>
                  <strong>{feedback.revieweeName}</strong>
                </Typography>
              </Box>

              {/* Direita */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton>
                  <Edit />
                </IconButton>
                <IconButton>
                  <Delete />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />
          </>
        ))
      ) : (
        <Typography>
          Você ainda não avaliou ninguém, <br />
          Avalie clicando <Link to={`/feedback/${userId}`}> aqui </Link>
        </Typography>
      )}
    </Box>
  );
};

export default Dashboard;
