import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User/UserContext";
import UserProfileCard from "../../components/Card/User/UserProfileCard";
import Dialog from "../../components/Dialog/Dialog";
import { useFetchUsers } from "../../hooks/useFetchUsers";

const Profile = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);

  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const { userId } = useParams();
  const [dialog, setDialog] = useState(false);

  const { getUserById, user } = useFetchUsers(userId)

  useEffect(() => {
    const fetchData = async () => {
      await getUserById()
    }
    fetchData()
  }, [userRole, userId, getUserById]);

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
