import {
  Dialog as DialogComponent,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
} from "@mui/material";
import UserProfileForm from "../Forms/User/UserProfileForm";
import type { IDialogProps } from "../../interfaces/IDialog";
import FeedbackForm from "../Forms/Feedback/FeedbackForm";
import { useContext } from "react";
import { ReviewContext } from "../../context/Review/ReviewContext";

const Dialog = ({
  onClose,
  userId,
  onSubmit,
  label,
  feedbackId,
}: IDialogProps) => {
  const { setRevieweeName } = useContext(ReviewContext);

  return (
    <DialogComponent
      open
      fullWidth
      onClose={() => {
        onClose() 
        setRevieweeName("");
      }}
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
              <UserProfileForm
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
