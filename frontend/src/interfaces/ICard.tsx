export interface IFeedbackCard {
  id: string;
  rating: number;
  comment: string;
  positivePoint: string;
  negativePoint: string;
  category: string;
  date: string;
  reviewerId: string;
  revieweeId: string;
  reviewerRole: string;
  revieweeRole: string;
  reviewerName: string;
  revieweeName: string;
  userIdByParams?: string;
}

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
