import { Box, Button, MenuItem, Rating, Stack, TextField, Typography } from "@mui/material";

const Feedback = () => {

  const categories = [
    "Atendimento",
    "Produto",
    "Serviço",
    "Suporte Técnico",
    "Outros"
  ];

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 4,
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: "background.paper",
      }}
    >
      <Typography align="center" variant="h4" gutterBottom>
        Deixe seu Feedback
      </Typography>
      <Typography align="center" variant="body1" gutterBottom>
        Sua opinião é muito importante!
      </Typography>

      <br />

      <form>
        <Stack spacing={2}>
          <TextField
            label="Nome da Empresa"
            name="enterprise"
            required
            fullWidth
          />

          <Box>
            <Typography component="legend">Nota</Typography>
            <Rating
              name="rating"
              precision={0.5}
              size="large"
            />
          </Box>

          <TextField
            label="Ponto Positivo"
            name="positivePoint"
            fullWidth
          />

          <TextField
            label="Ponto Negativo"
            name="negativePoint"
            fullWidth
          />

          <TextField
            label="Categoria"
            name="category"
            select
            fullWidth
          >
            {categories.map((option , i) => (
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
      </form>
    </Box>
  );
}

export default Feedback;