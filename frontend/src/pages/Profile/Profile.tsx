import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/User/UserContext";
import UserProfileCard from "../../components/Card/User/UserProfileCard";
import Dialog from "../../components/Dialog/Dialog";
import { useFetchUserById } from "../../hooks/useFetchUserById";

const Profile = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const { userRole } = useContext(UserContext);

  if (!id || !userRole) {
    navigate("/login");
  }

  const { userId } = useParams();
  const [dialog, setDialog] = useState(false);
  const { data: user, loading, error } = useFetchUserById(userId!);

  if (loading) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align="center">
          Carregando...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <>
      {dialog && user && (
        <Dialog
          userId={user[0].id}
          onClose={() => setDialog(false)}
          label="profile"
        />
      )}

      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          position: "relative",
          p: 2,
        }}
      >
        {user && (
          <UserProfileCard
            id={user[0].id}
            name={user[0].name}
            email={user[0].email}
            avatar={user[0].avatar}
            phone={user[0].phone}
            address={user[0].address}
            setDialog={() => setDialog(true)}
          />
        )}
      </Box>
    </>
  );
};

export default Profile;
