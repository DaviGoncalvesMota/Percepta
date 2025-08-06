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

export interface ICompanyCard {
  name: string;
  logo: string;
  userId?: string;
  revieweeId: string
}
