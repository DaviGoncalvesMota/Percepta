import { Box, TextField } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import type {
  ProfileFormHandles,
  ProfileFormProps,
} from "../../interfaces/IUsers";

const ProfileForm = forwardRef<ProfileFormHandles, ProfileFormProps>(
  ({ userName, userEmail, userAvatar, userAddress, userPhone }, ref) => {
    const [name, setName] = useState<string>(userName || "");
    const [email, setEmail] = useState<string>(userEmail || "");
    const [avatar, setAvatar] = useState<string>(userAvatar || "");
    const [phone, setPhone] = useState<string>(userPhone || "");
    const [address, setAddress] = useState<string>(userAddress || "");

    useImperativeHandle(ref, () => ({
      getName: () => name,
      getEmail: () => email,
      getAvatar: () => avatar,
      getPhone: () => phone,
      getAddress: () => address,
    }));

    return (
      <>
        <Box></Box>
        <TextField
          label="Nome"
          name="name"
          required
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Email"
          name="email"
          required
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Avatar"
          name="avatar"
          required
          fullWidth
          margin="normal"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <TextField
          label="Telefone"
          name="telefone"
          required
          margin="normal"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Endereço"
          name="endereco"
          required
          margin="normal"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </>
    );
  }
);

export default ProfileForm;
