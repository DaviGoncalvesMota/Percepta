import { useContext } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/User/UserContext";
import UserSelectedCard from "../../components/Card/User/UserSelectCard";
import { useFetchUsers } from "../../hooks/Actions/Get/Users/useFetchUsers";
import LoadingScreen from "../../components/Loading/LoadingScreen";

const AvailableUsers = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("userId");
  const { userRole } = useContext(UserContext);
  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const { userId } = useParams();
  const { data: users, loading, error } = useFetchUsers();

  if (loading) {
    <LoadingScreen />;
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
            <UserSelectedCard
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
