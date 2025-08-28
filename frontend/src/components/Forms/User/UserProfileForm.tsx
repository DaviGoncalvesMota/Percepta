import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { IDialogForm } from "../../../interfaces/IDialog";
import type { IUsers } from "../../../interfaces/IUsers";
import { useFetchUserById } from "../../../hooks/Actions/Get/Users/useFetchUserById";
import { useUpdateUser } from "../../../hooks/Actions/Put/Users/useUpdateUser";

const UserProfileForm = ({ userId, onClose }: IDialogForm) => {
  const {
    data: user,
    loading: loadingFetchUser,
    error: fetchUserError,
  } = useFetchUserById(userId!);

  const {
    updateUser,
    data: response,
    loading: loadingUpdateUser,
    error: updateError,
  } = useUpdateUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setAvatar(user.avatar);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [user]);

  if (loadingFetchUser) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align="center">
          Carregando...
        </Typography>
      </Box>
    );
  }

  if (fetchUserError) {
    return <p>{String(fetchUserError)}</p>;
  }

  const handleSubmit = () => {
    if (!user) return;

    const newUserData: IUsers = {
      id: userId!,
      name,
      email,
      password,
      phone,
      avatar,
      address,
    };

    updateUser(userId!, newUserData).then(() => {
      try {
        if (loadingUpdateUser) {
          return (
            <Box sx={{ padding: 2 }}>
              <Typography variant="h4" align="center">
                Carregando...
              </Typography>
            </Box>
          );
        }
        if (response) {
          onClose(response);
          window.location.reload();
        }
      } catch (error) {
        console.log(error, updateError);
      }
    });
  };

  return (
    <>
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
        label="Senha"
        required
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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

export default UserProfileForm;
