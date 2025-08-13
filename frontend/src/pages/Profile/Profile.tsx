// src/pages/ProfilePage.tsx
import { Box } from "@mui/material";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User/UserContext";
import type { IUsers } from "../../interfaces/IUsers";
import ProfileCard from "../../components/Card/ProfileCard";

const Profile = () => {
  const navigate = useNavigate();
  
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);

  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const id = useParams().id;
  const [employers, setEmployers] = useState<IUsers[]>([]);
  const [companies, setCompanies] = useState<IUsers[]>([]);
  const [dialog, setDialog] = useState<React.ReactNode>();

  useEffect(() => {
    if (userRole == "employer") {
      axios
        .get(baseURL + "/employers?id=" + id)
        .then((response) => {
          const userData = response.data;
          if (userData) {
            setEmployers(userData);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      axios
        .get(baseURL + "/companies?id=" + id)
        .then((response) => {
          const userData = response.data;
          if (userData) {
            setCompanies(userData);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [userRole, id]);

  return (
    <>
      {dialog}
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
        {userRole == "employer" &&
          employers.map((employer, index) => (
            <ProfileCard
              key={index}
              id={employer.id}
              name={employer.name}
              email={employer.email}
              avatar={employer.avatar}
              phone={employer.phone}
              address={employer.address}
              setDialog={setDialog}
            />
          ))}
        {userRole == "company" &&
          companies.map((company, index) => (
            <ProfileCard
              key={index}
              id={company.id}
              name={company.name}
              email={company.email}
              avatar={company.avatar}
              phone={company.phone}
              address={company.address}
              setDialog={setDialog}
            />
          ))}
      </Box>
    </>
  );
};

export default Profile;
