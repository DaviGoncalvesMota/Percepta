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

const Dialog = ({
  onClose,
  userId,
  onSubmit,
  label,
  feedbackId,
}: IDialogProps) => {
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
      <DialogContent
        sx={{
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
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
              <FeedbackForm
                onClose={onClose}
                feedbackId={feedbackId}
                label={label}
                userId={userId}
              />
            )}
          </Stack>
        </FormControl>
      </DialogContent>
    </DialogComponent>
  );
};

export default Dialog;
