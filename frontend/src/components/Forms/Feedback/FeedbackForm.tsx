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
import { useContext, useEffect, useId, useState } from "react";
import { ReviewContext } from "../../../context/Review/ReviewContext";
import { UserContext } from "../../../context/User/UserContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  companyCategories,
  employeeCategories,
} from "../../../data/categories";
import type { IFeedbackForm } from "../../../interfaces/IFeedback";
import { useInsertFeedback } from "../../../hooks/Actions/Post/useInsertFeedback";
import { useUpdateFeedback } from "../../../hooks/Actions/Put/Feedbacks/useUpdateFeedback";
import { useFetchUserById } from "../../../hooks/Actions/Get/Users/useFetchUserById";
import { useFetchFeedbackDetails } from "../../../hooks/Actions/Get/Feedbacks/useFetchFeedbackDetails";

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
  const [date] = useState<Dayjs>(dayjs());
  const { insertFeedback } = useInsertFeedback();
  const { updateFeedback } = useUpdateFeedback();
  const { data: userResponse } = useFetchUserById(userId!);
  const { data: feedbackResponse } = useFetchFeedbackDetails(feedbackId!);
  const id = useId();

  useEffect(() => {
    if (userId && userRole) {
      try {
        if (userResponse) {
          setCurrentUser(userResponse.name);
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    }
    return;
  }, [userResponse, label, userId, userRole]);

  useEffect(() => {
    if (label == "dashboard" && userId && userRole) {
      try {
        if (feedbackResponse.length > 0) {
          setRating(feedbackResponse[0].rating);
          setPositivePoint(feedbackResponse[0].positivePoint);
          setNegativePoint(feedbackResponse[0].negativePoint);
          setCategory(feedbackResponse[0].category);
          setComment(feedbackResponse[0].comment);
          setRevieweeName(feedbackResponse[0].revieweeName);
          setRevieweeId(feedbackResponse[0].revieweeId);
          setRevieweeAvatar(feedbackResponse[0].revieweeAvatar);
        }
      } catch (err) {
        console.error("Erro ao buscar feedback:", err);
      }
    }
  }, [
    feedbackResponse,
    setRevieweeName,
    setRevieweeId,
    setRevieweeAvatar,
    label,
    userId,
    userRole,
  ]);

  const handleSubmit = () => {
    if (rating === null) {
      console.error("Rating is required.");
      return;
    }

    if (!revieweeId || !revieweeName) {
      console.error("Reviewee information is missing.");
      return;
    }

    if (!userId || !userRole || !currentUser) {
      console.error("Reviewer information is missing.");
      return;
    }

    const feedback = {
      id,
      rating,
      positivePoint,
      negativePoint,
      category,
      comment,
      date: date.format("DD/MM/YYYY"),
      reviewerId: userId,
      revieweeId,
      reviewerName: currentUser,
      revieweeName,
      reviewerRole: userRole,
      revieweeRole: userRole === "employer" ? "company" : "employer",
      revieweeAvatar,
    };

    if (label === "feedback") {
      insertFeedback(feedback).then((success) => {
        if (success) {
          if (userRole === "employer") {
            navigate(`/allfeedbacks/${userId}`);
          } else {
            navigate(`/dashboard/${userId}`);
          }
        } else {
          console.error("Failed to submit feedback");
        }
      });
    }

    if (label === "dashboard") {
      updateFeedback(feedbackId ?? "", feedback).then(() => {
        if (onClose && feedbackId) {
          onClose(feedback);
        }
      });
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

// useEffect(() => {
//   const fetchUser = async () => {
//     try {
//       const endpoint = userRole === "employer" ? "/employers" : "/companies";
//       const response = await axios.get(`${baseURL}${endpoint}?id=${userId}`);

//       const name = response.data[0]?.name;

//       if (name) {
//         setCurrentUser(name);
//       } else {
//         console.warn("Usuário não encontrado.");
//       }
//     } catch (err) {
//       console.error("Erro ao buscar usuário:", err);
//     }
//   };

//   const fetchFeedback = async () => {
//     try {
//       const response = await axios.get(
//         `${baseURL}/feedbacks?id=${feedbackId}`
//       );

//       setRating(response.data[0].rating);
//       setPositivePoint(response.data[0].positivePoint);
//       setNegativePoint(response.data[0].negativePoint);
//       setCategory(response.data[0].category);
//       setComment(response.data[0].comment);
//       setDate(dayjs(response.data[0].date));
//       setRevieweeName(response.data[0].revieweeName);
//       setRevieweeId(response.data[0].revieweeId);
//       setRevieweeAvatar(response.data[0].revieweeAvatar);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (userId && userRole) {
//     fetchUser();
//   }

//   if (userId && userRole && label === "dashboard") {
//     fetchFeedback();
//   }
// }, [
//   userId,
//   userRole,
//   label,
//   feedbackId,
//   setRevieweeName,
//   setRevieweeId,
//   setRevieweeAvatar,
// ]);
