import {
  Box,
  Button,
  MenuItem,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { IForms } from "../../interfaces/IForms";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ReviewContext } from "../../context/Review/ReviewContext";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { UserContext } from "../../context/User/UserContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Forms = ({ categories, userId }: IForms) => {
  const { revieweeName, revieweeId } = useContext(ReviewContext);
  const { userRole } = useContext(UserContext);
  const [rating, setRating] = useState<number | null>(null);
  const [positivePoint, setPositivePoint] = useState<string>("");
  const [negativePoint, setNegativePoint] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string>("");

  const date = dayjs();

  useEffect(() => {
    if (userRole == "employer") {
      axios
        .get(baseURL + "/employers?id=" + userId)
        .then((response) => setCurrentUser(response.data[0].name))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(baseURL + "/companies?id=" + userId)
        .then((response) => setCurrentUser(response.data[0].name))
        .catch((err) => console.log(err));
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
    };

    axios
      .post(baseURL + "/feedbacks", feedback)
      .then(function () {
        window.location.href = "/allfeedbacks/" + userId;
      })
      .catch((err) => console.log(err));
  };

  const verifyUserForm = () => {
    if (userRole == "company") {
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
            to={"/availableusers/" + userId}
            variant="contained"
          >
            {" "}
            Escolha o Funcionário
          </Button>
        </>
      );
    }
    else if (userRole == "employer") {
       return (
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
            to={"/availableusers/" + userId}
            variant="contained"
          >
            {" "}
            Escolha o Funcionário
          </Button>
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

        {verifyUserForm()}

        <Box>
          <Typography component="legend">Nota</Typography>
          <Rating
            onChange={(_, newHover) => {
              setRating(newHover);
            }}
            name="rating"
            precision={0.5}
            size="large"
          />
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
          {categories.map((option, i) => (
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

export default Forms;
