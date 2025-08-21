export interface IUsers {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    avatar: string;
    cnpj?: string;
    yearFoundation?: number;
    employersNumber?: number;
    objective?: string;
}

export interface IUserCard {
  name: string;
  logo: string;
  userId?: string;
  revieweeId: string
}

export interface IUserProfileCard {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  address: string;
  setDialog: React.Dispatch<React.SetStateAction<React.ReactNode>>
}
