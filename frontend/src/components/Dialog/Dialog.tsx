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

const Dialog = ({ onClose }: IDialog) => {
  return (
    <DialogComponent
      open
      slotProps={{
        paper: {
          component: "form",
        },
      }}
      fullWidth
      onClose={onClose}
    >
      <DialogTitle sx={{ textAlign: "center" }}> Editar </DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="standard">
          <Stack spacing={2}></Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button type="submit"> Concluir </Button>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </DialogComponent>
  );
};

export default Dialog;
