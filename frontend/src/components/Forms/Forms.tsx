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

const Forms = ({ categories, enterprises }: IForms) => {
  return (
    <>
      <Stack spacing={2}>
        <TextField
          label="Nome da Empresa"
          select
          name="enterprise"
          required
          fullWidth
        >
          {enterprises &&
            enterprises.map((enterprise, index) => (
              <MenuItem key={index} value={enterprise.id}>
                {enterprise.name}
              </MenuItem>
            ))}
        </TextField>

        <Box>
          <Typography component="legend">Nota</Typography>
          <Rating name="rating" precision={0.5} size="large" />
        </Box>

        <TextField label="Ponto Positivo" name="positivePoint" fullWidth />

        <TextField label="Ponto Negativo" name="negativePoint" fullWidth />

        <TextField label="Categoria" name="category" select fullWidth>
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
          fullWidth
        />

        <Button variant="contained" color="primary" type="submit">
          Enviar Feedback
        </Button>
      </Stack>
    </>
  );
};

export default Forms;
