import { useState } from "react";
import {
  getFeedbackByIdService,
  getFeedbackDetailsService,
  getFeedbacksService,
  getRevieweeFeedbacksService,
  getReviewerFeedbacksService,
} from "../services/api";
import type { IFeedback } from "../interfaces/IFeedback";

export function useFetchFeedbacks(id: string) {
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [feedback, setFeedback] = useState<IFeedback[]>([]);
  const [revieweeFeedbacks, setRevieweeFeedbacks] = useState<IFeedback[]>([]);
  const [reviewerFeedbacks, setReviewerFeedbacks] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const getFeedbacks = async () => {
    try {
      if (id) {
        getFeedbackDetailsService(id)
          .then((response) => setFeedbacks(response.data))
          .catch((err) => setError(err))
          .finally(() => setLoading(false));
      } else {
        getFeedbacksService()
          .then((response) => setFeedbacks(response.data))
          .catch((err) => setError(err))
          .finally(() => setLoading(false));
      }
    } catch (err) {
      console.log("Erro: ", err);
    }
  };

  const getFeedbackById = async () => {
    try {
      if (id) {
        getFeedbackByIdService(id)
          .then((response) => setFeedback(response.data))
          .catch((err) => setError(err))
          .finally(() => setLoading(false));
      }
    } catch (err) {
      console.log("Erro: ", err);
    }
  };

  const getRevieweeFeedbacks = async () => {
    try {
      if (id) {
        getRevieweeFeedbacksService(id)
          .then((response) => setRevieweeFeedbacks(response.data))
          .catch((err) => setError(err))
          .finally(() => setLoading(false));
      }
    } catch (err) {
      console.log("Erro: ", err);
    }
  };

  const getReviewerFeedbacks = async () => {
    try {
      if (id) {
        getReviewerFeedbacksService(id)
          .then((response) => setReviewerFeedbacks(response.data))
          .catch((err) => setError(err))
          .finally(() => setLoading(false));
      }
    } catch (err) {
      console.log("Erro: ", err);
    }
  };

  return {
    getRevieweeFeedbacks,
    revieweeFeedbacks,
    setRevieweeFeedbacks,
    getFeedbackById,
    feedback,
    getReviewerFeedbacks,
    reviewerFeedbacks,
    setReviewerFeedbacks,
    getFeedbacks,
    feedbacks,
    loading,
    error,
  };
}
