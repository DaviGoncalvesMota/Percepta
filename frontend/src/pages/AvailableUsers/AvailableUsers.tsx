import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseURL } from "../../baseURL";
import type { IUsers } from "../../interfaces/IUsers";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/User/UserContext";
import UserCard from "../../components/Card/UserCard";

const AvailableUsers = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");
  const { userRole } = useContext(UserContext);
  if (!isAuthenticated || !userRole) {
    navigate("/login");
  }

  const [companies, setCompanies] = useState<IUsers[]>([]);
  const [employers, setEmployers] = useState<IUsers[]>([]);

  const { userId } = useParams();

  useEffect(() => {
    if (userRole == "employer") {
      axios
        .get(baseURL + "/companies")
        .then((res) => setCompanies(res.data))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(baseURL + "/employers")
        .then((res) => setEmployers(res.data))
        .catch((err) => console.log(err));
    }
  }, [userRole]);

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
        {companies.length > 0
          ? companies.map((company, index) => (
              <UserCard
                key={index}
                name={company.name}
                logo={company.avatar}
                userId={userId}
                revieweeId={company.id}
              />
            ))
          : employers.map((employer, index) => (
              <UserCard
                key={index}
                name={employer.name}
                logo={employer.avatar}
                userId={userId}
                revieweeId={employer.id}
              />
            ))}
      </Box>
    </>
  );
};

export default AvailableUsers;
