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

export interface ProfileFormHandles {
  getName: () => string;
  getEmail: () => string;
  getAvatar: () => string;
  getPhone: () => string;
  getAddress: () => string;
}

export interface ProfileFormProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  userPhone?: string;
  userAddress?: string;
}
