import {
  Button,
  DialogActions,
  Dialog as DialogComponent,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
} from "@mui/material";
import type { IDialog } from "../../interfaces/IDialog";
import ProfileForm from "../Forms/ProfileForm";
import { useContext, useEffect, useRef, useState } from "react";
import type { IUsers, ProfileFormHandles } from "../../interfaces/IUsers";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { UserContext } from "../../context/User/UserContext";

const Dialog = ({ onClose, userId }: IDialog) => {
  const userRef = useRef<ProfileFormHandles>(null);
  const { userRole } = useContext(UserContext);
  const [user, setUser] = useState<IUsers | null>(null);

  const endpointGet =
    userRole === "employer" ? "/employers?id=" : "/companies?id=";

  const endpointPut = userRole === "employer" ? "/employers/" : "/companies/";

  useEffect(() => {
    axios
      .get(baseURL + endpointGet + userId)
      .then((response) => setUser(response.data[0]))
      .catch((err) => console.log(err));
  }, [endpointGet, userId]);

  const handleSubmit = () => {
    if (!userRef.current) return;

    const name = userRef.current.getName();
    const email = userRef.current.getEmail();
    const avatar = userRef.current.getAvatar();
    const phone = userRef.current.getPhone();
    const address = userRef.current.getAddress();

    const newUserData = {
      name,
      email,
      phone,
      avatar,
      address,
    };

    axios
      .put(baseURL + endpointPut + userId, newUserData)
      .then((response) => {
        setUser(response.data[0]);
        onClose()
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };

  return (
    <DialogComponent
      open
      fullWidth
      onClose={onClose}
      slotProps={{
        paper: {
          component: "form",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center" }}>Editar</DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="standard">
          <Stack spacing={2}>
            {user && (
              <ProfileForm
                ref={userRef}
                userName={user.name}
                userEmail={user.email}
                userPhone={user.phone}
                userAddress={user.address}
                userAvatar={user.avatar}
              />
            )}
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          Concluir
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </DialogComponent>
  );
};

export default Dialog;
