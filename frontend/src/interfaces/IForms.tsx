import type { IUsers } from "./IUsers"

export interface IDialogForm {
  onClose: (updatedUser: IUsers) => void
  userId?: string
}