import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/User/UserContext";
import UserCard from "../../components/Card/User/UserCard";
import { useFetchUsers } from "../../hooks/useFetchUsers";

const AvailableUsers = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);
  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const { userId } = useParams();

  const { data: users, loading, error } = useFetchUsers();

   if (loading) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align="center">
          Carregando...
        </Typography>
      </Box>
    );
  }

  if (error) return <p>{error}</p>; 

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        {users.length > 0 &&
          users.map((company, index) => (
            <UserCard
              key={index}
              name={company.name}
              logo={company.avatar}
              userId={userId}
              revieweeId={company.id}
            />
          ))}
      </Box>
    </>
  );
};

export default AvailableUsers;
