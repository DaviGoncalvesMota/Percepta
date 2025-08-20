export interface IUserCard {
  name: string;
  logo: string;
  userId?: string;
  revieweeId: string
}

export interface IProfileCard {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  address: string;
  setDialog: React.Dispatch<React.SetStateAction<React.ReactNode>>
}
