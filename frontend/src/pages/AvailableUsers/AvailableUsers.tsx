import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseURL } from "../../baseURL";
import type { ICompanies } from "../../interfaces/ICompanies";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import type { IEmployers } from "../../interfaces/IEmployers";
import { UserContext } from "../../context/User/UserContext";
import UserCard from "../../components/Card/UserCard";

const AvailableUsers = () => {
  const { userRole } = useContext(UserContext)
  const [companies, setCompanies] = useState<ICompanies[]>([]);
  const [employers, setEmployers] = useState<IEmployers[]>([])

  const userId = useParams().id

  useEffect(() => {
    if(userRole == "employer"){
      axios
      .get(baseURL + "/companies")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.log(err));
    }
    else {
      axios
        .get(baseURL + "/employers")
        .then((res) => setEmployers(res.data))
        .catch((err) => console.log(err))
    }
  }, [userRole]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
        {companies.length > 0 ?
          companies.map((company, index) => (
            <UserCard key={index} name={company.name} logo={company.avatar} userId={userId} revieweeId={company.id}/>
          )) : (
            employers.map((employer, index) => (
              <UserCard key={index} name={employer.name} logo={employer.avatar} userId={userId} revieweeId={employer.id} />
            ))
          )}
      </Box>
    </>
  );
};

export default AvailableUsers;
