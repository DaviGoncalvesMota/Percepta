import {
  Dialog as DialogComponent,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
} from "@mui/material";
import ProfileForm from "../Forms/ProfileForm";
import type { IDialogProps } from "../../interfaces/IDialog";
import FeedbackForm from "../Forms/FeedbackForm";


const Dialog = ({ onClose, userId, onSubmit, label }: IDialogProps) => {
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
            {label == "profile" && (
              <ProfileForm
                userId={userId}
                onClose={(updatedUser) => {
                  onSubmit(updatedUser); 
                  onClose();
                }}
              />
            )}
            {label == "dashboard" && (
              <FeedbackForm label={label} userId={userId}/>
            )}
          </Stack>
        </FormControl>
      </DialogContent>
    </DialogComponent>
  );
};

export default Dialog;
