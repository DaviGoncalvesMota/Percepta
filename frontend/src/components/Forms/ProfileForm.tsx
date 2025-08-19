import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User/UserContext";
import axios from "axios";
import { baseURL } from "../../baseURL";
import type { IDialogForm } from "../../interfaces/IForms";
import type { IUsers } from "../../interfaces/IUsers";

const ProfileForm = ({ userId, onClose }: IDialogForm) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { userRole } = useContext(UserContext);

  const endpointGet =
    userRole === "employer" ? "/employers?id=" : "/companies?id=";

  const endpointPut = userRole === "employer" ? "/employers/" : "/companies/";

  useEffect(() => {
    axios
      .get(baseURL + endpointGet + userId)
      .then((response) => {
        const user: IUsers = response.data[0];
        setName(user.name);
        setEmail(user.email);
        setAvatar(user.avatar);
        setPhone(user.phone);
        setAddress(user.address);
      })
      .catch((err) => console.log(err));
  }, [endpointGet, userId]);

  const handleSubmit = () => {
    const newUserData = { name, email, phone, avatar, address };

    axios
      .put(baseURL + endpointPut + userId, newUserData)
      .then((response) => {
        const updatedUser: IUsers = response.data[0];
        onClose(updatedUser);
      })
      .catch((err) => console.log(err));
    window.location.reload();
  };

  return (
    <>
      <Box></Box>
      <TextField
        label="Nome"
        required
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Email"
        required
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Avatar"
        required
        fullWidth
        margin="normal"
        type="url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />

      <TextField
        label="Telefone"
        required
        margin="normal"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <TextField
        label="Endereço"
        required
        margin="normal"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Concluir
      </Button>
    </>
  );
};

export default ProfileForm;
