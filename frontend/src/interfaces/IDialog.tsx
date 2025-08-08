import type { IUsers } from "./IUsers";

export interface IDialog {
    onClose: () => void
    userId: string
    onUserUpdated?: (updatedUser: IUsers) => void;
}