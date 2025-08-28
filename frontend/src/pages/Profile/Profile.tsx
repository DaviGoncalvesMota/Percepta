import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/User/UserContext";
import UserProfileCard from "../../components/Card/User/UserProfileCard";
import Dialog from "../../components/Dialog/Dialog";
import { useFetchUserById } from "../../hooks/Actions/Get/Users/useFetchUserById";
import LoadingScreen from "../../components/Loading/LoadingScreen";

const Profile = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const { userRole } = useContext(UserContext);

  const { userId } = useParams();
  const [dialog, setDialog] = useState(false);
  const { data: user, loading, error } = useFetchUserById(userId!);

  if (!id || !userRole) {
    navigate("/login");
  }

  if (loading) {
    <LoadingScreen />;
  }

  if (error) {
    return <p>Erro: {String(error)}</p>;
  }

  return (
    <>
      {dialog && user && (
        <Dialog
          userId={user.id}
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
            id={user.id}
            name={user.name}
            email={user.email}
            avatar={user.avatar}
            phone={user.phone}
            address={user.address}
            setDialog={() => setDialog(true)}
          />
        )}
      </Box>
    </>
  );
};

export default Profile;