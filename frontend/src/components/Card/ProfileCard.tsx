import { Email, LocationOn, Phone } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Dialog from "../Dialog/Dialog";
import type { IProfileCard } from "../../interfaces/ICard";

const ProfileCard = ({id, name, email, avatar, phone, address, setDialog}: IProfileCard) => {
  return (
    <Card
      key={id}
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
            src={avatar}
            sx={{
              width: 120,
              height: 120,
              border: "4px solid #1976d2",
            }}
          />
          <Typography variant="h4" fontWeight="600" color="primary">
            {name}
          </Typography>

          <Divider flexItem />

          <Stack spacing={2} width="100%" px={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Email color="action" />
              <Typography variant="body1">{email}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Phone color="action" />
              <Typography variant="body1">{phone}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <LocationOn color="action" />
              <Typography variant="body1">{address}</Typography>
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
                  setDialog(<Dialog onClose={() => setDialog(false)} />)
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
  );
};

export default ProfileCard;
