import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        gap: 3,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          alt="Logo"
          style={{ width: 100, height: 100 }}
        />
      </motion.div>

      <Typography
        variant="h6"
        sx={{ color: "text.primary", fontWeight: "bold", textAlign: "center" }}
      >
        Carregando sua experiência...
      </Typography>

      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      >
        <CircularProgress color="primary" size={60} thickness={4} />
      </motion.div>
    </Box>
  );
}
