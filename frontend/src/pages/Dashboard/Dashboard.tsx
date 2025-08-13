import { DashboardOutlined } from "@mui/icons-material";
import { Box, Typography, Paper, Grid, Divider, TextField, Autocomplete } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IFeedbackCard } from "../../interfaces/ICard";
import { UserContext } from "../../context/User/UserContext";
import { PieChart } from "@mui/x-charts";
import axios from "axios";
import { baseURL } from "../../baseURL";
import FeedbackCard from "../../components/Card/FeedbackCard";
import { companyCategories, employeeCategories } from "../../data/categories";

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);
  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const { id: userId } = useParams();
  const [feedbacks, setFeedbacks] = useState<IFeedbackCard[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    axios.get(baseURL + "/feedbacks?revieweeId=" + userId).then((response) => {
      setFeedbacks(response.data);
    });
  }, [userId]);

  const positiveCount = feedbacks.filter((f) => f.rating > 3).length;
  const neutralCount = feedbacks.filter(
    (f) => f.rating >= 3 && f.rating <= 3.9
  ).length;
  const negativeCount = feedbacks.filter((f) => f.rating < 3).length;

  const pieData = [
    { label: "Positivos", value: positiveCount },
    { label: "Neutros", value: neutralCount },
    { label: "Negativos", value: negativeCount },
  ];

  const categories = userRole === "company" ? companyCategories : employeeCategories;

  const renderSection = (
    title: string,
    color: string,
    emoji: string,
    min: number,
    max: number
  ) => {
    const filtered = feedbacks.filter(
      (f) =>
        f.rating >= min &&
        f.rating <= max &&
        (selectedCategories.length > 0
          ? selectedCategories.includes(f.category)
          : true)
    );

    return (
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2} gap={1}>
          <Typography variant="h5" color={color} fontWeight="bold">
            {emoji} {title} ({filtered.length})
          </Typography>
        </Box>

        {filtered.length > 0 ? (
          <Grid container spacing={2} justifyContent="center">
            {filtered.map((feedback) => (
              <Grid key={feedback.id}>
                <FeedbackCard {...feedback} userIdByParams={userId} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="text.secondary" align="center">
            Nenhum feedback nesta categoria.
          </Typography>
        )}
      </Paper>
    );
  };

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
        <DashboardOutlined fontSize="large" color="primary" />
        <Typography variant="h4" fontWeight="bold">
          Minha Dashboard
        </Typography>
      </Box>

      <Typography variant="h6" color="text.secondary" align="center" mb={4}>
        Aqui você pode acompanhar suas avaliações e analisar os feedbacks por categoria e tipo.
      </Typography>
      
      <Box display="flex" justifyContent="center" mb={4}>
        <Autocomplete
          multiple
          options={categories}
          value={selectedCategories}
          onChange={(_, newValue) => setSelectedCategories(newValue)}
          renderInput={(params) => <TextField {...params} label="Filtrar por Categoria" />}
          sx={{ width: 400 }}
        />
      </Box>

      {feedbacks.length > 0 && (
        <Paper elevation={3} sx={{ mb: 4, p: 3, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h6" mb={2} fontWeight="bold">
            Distribuição de Feedbacks
          </Typography>
          <PieChart
            series={[
              {
                data: pieData,
                highlightScope: { fade: "global", highlight: "item" },
                faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              },
            ]}
            height={250}
            width={250}
          />
        </Paper>
      )}

      <Divider sx={{ mb: 4 }} />

      {renderSection("Feedbacks Positivos", "success.main", "👍", 4, 5)}
      {renderSection("Feedbacks Neutros", "warning.main", "😐", 3, 3.9)}
      {renderSection("Feedbacks Negativos", "error.main", "👎", 0, 2.9)}
    </Box>
  );
};

export default Dashboard;
