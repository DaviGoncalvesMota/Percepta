import {
  Box,
  Button,
  MenuItem,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ReviewContext } from "../../../context/Review/ReviewContext";
import axios from "axios";
import { baseURL } from "../../../baseURL";
import { UserContext } from "../../../context/User/UserContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { companyCategories, employeeCategories } from "../../../data/categories";
import type { IFeedbackForm } from "../../../interfaces/IFeedback";
import type { IFeedback } from "../../../interfaces/IFeedback";

const FeedbackForm = ({
  userId,
  label,
  feedbackId,
  onClose,
}: IFeedbackForm) => {
  const navigate = useNavigate();
  const {
    revieweeName,
    revieweeId,
    revieweeAvatar,
    setRevieweeName,
    setRevieweeAvatar,
    setRevieweeId,
  } = useContext(ReviewContext);
  const { userRole } = useContext(UserContext);

  const [rating, setRating] = useState<number | null>(null);
  const [positivePoint, setPositivePoint] = useState<string>("");
  const [negativePoint, setNegativePoint] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string>("");
  const [date, setDate] = useState<Dayjs>(dayjs());

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const endpoint = userRole === "employer" ? "/employers" : "/companies";
        const response = await axios.get(`${baseURL}${endpoint}?id=${userId}`);

        const name = response.data[0]?.name;

        if (name) {
          setCurrentUser(name);
        } else {
          console.warn("Usuário não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    };

    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/feedbacks?id=${feedbackId}`
        );

        setRating(response.data[0].rating);
        setPositivePoint(response.data[0].positivePoint);
        setNegativePoint(response.data[0].negativePoint);
        setCategory(response.data[0].category);
        setComment(response.data[0].comment);
        setDate(dayjs(response.data[0].date));
        setRevieweeName(response.data[0].revieweeName);
        setRevieweeId(response.data[0].revieweeId);
        setRevieweeAvatar(response.data[0].revieweeAvatar);
      } catch (err) {
        console.log(err);
      }
    };

    if (userId && userRole) {
      fetchUser();
    }

    if (userId && userRole && label === "dashboard") {
      fetchFeedback();
    }
  }, [
    userId,
    userRole,
    label,
    feedbackId,
    setRevieweeName,
    setRevieweeId,
    setRevieweeAvatar,
  ]);

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
      reviewerRole: userRole,
      revieweeRole: userRole === "employer" ? "company" : "employer",
      revieweeAvatar,
    };

    if (label === "feedback") {
      axios
        .post(baseURL + "/feedbacks", feedback)
        .then(() => {
          setRevieweeName("")
          navigate("/allfeedbacks/" + userId);
        })
        .catch((err) => console.log(err));
    }

    if (label === "dashboard") {
      axios
        .put(baseURL + "/feedbacks/" + feedbackId, feedback)
        .then((response) => {
          const updatedFeedback: IFeedback = response.data[0];
          setRevieweeName("")
          onClose(updatedFeedback);
        })
        .catch((err) => console.log(err))
    }
  };

  const verifyForm = () => {
    if (userRole === "company") {
      return (
        <>
          {label === "dashboard" ? (
            <TextField
              label="Nome do Funcionário"
              name="employer"
              required
              fullWidth
              disabled
              value={revieweeName}
            />
          ) : (
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
          )}
        </>
      );
    } else if (userRole === "employer") {
      return (
        <>
          {label === "dashboard" ? (
            <TextField
              label="Nome da Empresa"
              name="company"
              required
              fullWidth
              disabled
              value={revieweeName}
            />
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
    <Stack spacing={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker sx={{ display: "none" }} value={date} readOnly />
      </LocalizationProvider>

      {userRole === "company" || userRole === "employer"
        ? verifyForm()
        : "nao tem valor"}

      <Box>
        <Typography
          sx={{ textAlign: label === "dashboard" ? "center" : "left" }}
          component="legend"
        >
          Nota
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: label === "dashboard" ? "center" : "flex-start",
          }}
        >
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            name="rating"
            precision={0.5}
            size="large"
          />
        </Box>
      </Box>

      <TextField
        slotProps={{ htmlInput: { maxLength: 60 } }}
        label="Ponto Positivo"
        name="positivePoint"
        onChange={(e) => setPositivePoint(e.target.value)}
        fullWidth
        value={positivePoint}
      />

      <TextField
        slotProps={{ htmlInput: { maxLength: 60 } }}
        label="Ponto Negativo"
        name="negativePoint"
        onChange={(e) => setNegativePoint(e.target.value)}
        fullWidth
        value={negativePoint}
      />

      <TextField
        onChange={(e) => setCategory(e.target.value)}
        label="Categoria"
        name="category"
        select
        fullWidth
        value={category}
      >
        {userRole === "employer"
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
        value={comment}
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
  );
};

export default FeedbackForm;
