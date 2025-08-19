import {
  Box,
  Button,
  Divider,
  MenuItem,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ReviewContext } from "../../context/Review/ReviewContext";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { UserContext } from "../../context/User/UserContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { companyCategories, employeeCategories } from "../../data/categories";
import type { IFeedbackForm } from "../../interfaces/IUsers";

const FeedbackForm = ({ userId, label }: IFeedbackForm) => {
  const navigate = useNavigate();
  const { revieweeName, revieweeId } = useContext(ReviewContext);
  const { userRole } = useContext(UserContext);
  const [rating, setRating] = useState<number | null>(null);
  const [positivePoint, setPositivePoint] = useState<string>("");
  const [negativePoint, setNegativePoint] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");

  const date = dayjs();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const endpoint = userRole === "employer" ? "/employers" : "/companies";

        const response = await axios.get(`${baseURL}${endpoint}?id=${userId}`);

        const name = response.data[0].name;
        const avatar = response.data[0].avatar;

        if (name && avatar) {
          setCurrentUser(name);
          setUserAvatar(avatar);
        } else {
          console.warn("Usuário não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    };

    if (userId && userRole) {
      fetchUser();
    }
  }, [userId, userRole]);

  const handleSubmit = () => {
    const feedback = {
      rating,
      positivePoint,
      negativePoint,
      category,
      comment,
      date,
      reviewerId: userId,
      revieweeId,
      reviewerName: currentUser,
      revieweeName,
      reviewerRole: userRole == "employer" ? "" : "employer",
      revieweeRole: userRole == "company" ? "" : "company",
      revieweeAvatar: userAvatar,
    };

    axios
      .post(baseURL + "/feedbacks", feedback)
      .then(function () {
        navigate("/allfeedbacks/" + userId);
      })
      .catch((err) => console.log(err));
  };

  const verifyForm = () => {
    if (userRole === "company") {
      return (
        <>
          <TextField
            label="Nome do Funcionário"
            name="employer"
            required
            fullWidth
            disabled
            value={revieweeName}
          />

          <Button
            component={Link}
            to={`/availableusers/${userId}`}
            variant="contained"
          >
            Escolha o Funcionário
          </Button>
        </>
      );
    } else if (userRole === "employer") {
      return (
        <>
          {label == "dashboard" ? (
            ""
          ) : (
            <>
              <TextField
                label="Nome da Empresa"
                name="company"
                required
                fullWidth
                disabled
                value={revieweeName}
              />

              <Button
                component={Link}
                to={`/availableusers/${userId}`}
                variant="contained"
              >
                Escolha a Empresa
              </Button>
            </>
          )}
        </>
      );
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{ display: "none" }} value={date} readOnly />
        </LocalizationProvider>

        {userRole === "company" || userRole === "employer"
          ? verifyForm()
          : "nao tem valor"}

        <Box>
          {label == "dashboard" ? (
            <>
              <Divider sx={{ mb: "2%" }} />
              <Typography sx={{ textAlign: "center" }} component="legend">
                Nota
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Rating
                  onChange={(_, newHover) => {
                    setRating(newHover);
                  }}
                  name="rating"
                  precision={0.5}
                  size="large"
                />
              </Box>
            </>
          ) : (
            <>
              <Typography component="legend">Nota</Typography>
              <Rating
                onChange={(_, newHover) => {
                  setRating(newHover);
                }}
                name="rating"
                precision={0.5}
                size="large"
              />
            </>
          )}
        </Box>

        <TextField
          slotProps={{ htmlInput: { maxLength: 60 } }}
          label="Ponto Positivo"
          name="positivePoint"
          onChange={(e) => setPositivePoint(e.target.value)}
          fullWidth
        />

        <TextField
          slotProps={{ htmlInput: { maxLength: 60 } }}
          label="Ponto Negativo"
          name="negativePoint"
          onChange={(e) => setNegativePoint(e.target.value)}
          fullWidth
        />

        <TextField
          onChange={(e) => setCategory(e.target.value)}
          label="Categoria"
          name="category"
          select
          fullWidth
          value={category}
        >
          {userRole === "employers"
            ? companyCategories.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))
            : employeeCategories.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
        </TextField>

        <TextField
          label="Comentário"
          name="comment"
          multiline
          rows={4}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
        />

        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          type="submit"
        >
          Enviar Feedback
        </Button>
      </Stack>
    </>
  );
};

export default FeedbackForm;
