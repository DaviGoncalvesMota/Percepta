// src/pages/ProfilePage.tsx
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import type { IEmployers } from "../../interfaces/IEmployers";
import Dialog from "../../components/Dialog/Dialog";
import { UserContext } from "../../context/User/UserContext";
import type { ICompanies } from "../../interfaces/ICompanies";

const Profile = () => {
  const isAuthenticated = localStorage.getItem("user");
  if (!isAuthenticated) {
    window.location.href = "/login";
  }

  const { userRole } = useContext(UserContext);

  const id = useParams().id;
  const [employers, setEmployers] = useState<IEmployers[]>([]);
  const [companies, setCompanies] = useState<ICompanies[]>([]);
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
        {employers.length > 0
          ? employers.map((employer) => (
              <Card
                key={employer.id}
                sx={{ 
                  maxWidth: 500,
                  width: "100%",
                  borderRadius: 6,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  bgcolor: "background.paper",
                  position: "relative",
                }}
              >
                <CardContent>
                  {/* Conteúdo do perfil */}
                  <Stack spacing={3} alignItems="center" textAlign="center">
                    <Avatar
                      src={employer.avatar}
                      sx={{
                        width: 120,
                        height: 120,
                        border: "4px solid #1976d2",
                      }}
                    />
                    <Typography variant="h4" fontWeight="600" color="primary">
                      {employer.name}
                    </Typography>

                    <Divider flexItem />

                    <Stack spacing={2} width="100%" px={3}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Email color="action" />
                        <Typography variant="body1">
                          {employer.email}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <Phone color="action" />
                        <Typography variant="body1">
                          {employer.phone}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationOn color="action" />
                        <Typography variant="body1">
                          {employer.address}
                        </Typography>
                      </Box>
                    </Stack>

                    <Divider flexItem />

                    <Stack width="70%">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1}
                      >
                        <Button
                          onClick={() =>
                            setDialog(
                              <Dialog onClose={() => setDialog(false)} />
                            )
                          }
                          variant="outlined"
                          color="warning"
                        >
                          {" "}
                          Editar Perfil{" "}
                        </Button>
                        <Button
                          onClick={() => localStorage.removeItem("user")}
                          variant="outlined"
                          color="error"
                        >
                          {" "}
                          Sair da Conta{" "}
                        </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))
          : companies.map((company) => (
              <Card
                key={company.id}
                sx={{
                  maxWidth: 500,
                  width: "100%",
                  borderRadius: 6,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  bgcolor: "background.paper",
                  position: "relative",
                }}
              >
                <CardContent>
                  {/* Conteúdo do perfil */}
                  <Stack spacing={3} alignItems="center" textAlign="center">
                    <Avatar
                      src={company.avatar}
                      sx={{
                        width: 120,
                        height: 120,
                        border: "4px solid #1976d2",
                      }}
                    />
                    <Typography variant="h4" fontWeight="600" color="primary">
                      {company.name}
                    </Typography>

                    <Divider flexItem />

                    <Stack spacing={2} width="100%" px={3}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Email color="action" />
                        <Typography variant="body1">{company.email}</Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <Phone color="action" />
                        <Typography variant="body1">{company.phone}</Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationOn color="action" />
                        <Typography variant="body1">
                          {company.address}
                        </Typography>
                      </Box>
                    </Stack>

                    <Divider flexItem />

                    <Stack width="70%">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1}
                      >
                        <Button
                          onClick={() =>
                            setDialog(
                              <Dialog onClose={() => setDialog(false)} />
                            )
                          }
                          variant="outlined"
                          color="warning"
                        >
                          {" "}
                          Editar Perfil{" "}
                        </Button>
                        <Button
                          onClick={() => localStorage.removeItem("user")}
                          variant="outlined"
                          color="error"
                        >
                          {" "}
                          Sair da Conta{" "}
                        </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
      </Box>
    </>
  );
};

export default Profile;
