export interface IFeedback {
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
  userId?: string;
  revieweeAvatar: string;
}

export interface IFeedbackForm {
  userId?: string
  label: string
  feedbackId?: string
  onClose: (updatedUser: IFeedback) => void
}