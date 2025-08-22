import type { IUsers } from "./IUsers";

export interface IDialogProps {
  userId?: string;
  onClose: () => void;
  onSubmit?: (updatedUser: IUsers) => void;
  label: string
  feedbackId?: string
}

export interface IDialogForm {
  onClose: (updatedUser: IUsers) => void
  userId?: string
}

