import { Box } from "@mui/material";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User/UserContext";
import type { IUsers } from "../../interfaces/IUsers";
import ProfileCard from "../../components/Card/ProfileCard";
import Dialog from "../../components/Dialog/Dialog"; // importa seu Dialog corrigido

const Profile = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);

  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const { userId } = useParams();
  const [user, setUser] = useState<IUsers | null>(null);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    const endpoint =
      userRole === "employer" ? "/employers?id=" : "/companies?id=";

    axios
      .get(baseURL + endpoint + userId)
      .then((response) => {
        if (response.data && response.data[0]) {
          setUser(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userRole, userId]);

  return (
    <>
      {dialog && user && (
        <Dialog
          userId={user.id}
          onClose={() => setDialog(false)}
          onSubmit={(updatedUser) => setUser(updatedUser)}
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
          <ProfileCard
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
