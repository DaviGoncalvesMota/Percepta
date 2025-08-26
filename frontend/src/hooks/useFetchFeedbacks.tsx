import { useEffect, useState } from "react";
import type { IFeedback } from "../interfaces/IFeedback";
import { getFeedbacks } from "../services/api";

export function useFetchFeedbacks() {
  const [data, setData] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      getFeedbacks()
        .then((response) => setData(response.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    } catch (err) {
      console.log("Erro: ", err);
    }
  }, []);

  // const getRevieweeFeedbacks = async () => {
  //   try {
  //     if (id) {
  //       getRevieweeFeedbacksService(id)
  //         .then((response) => setRevieweeFeedbacks(response.data))
  //         .catch((err) => setError(err))
  //         .finally(() => setLoading(false));
  //     }
  //   } catch (err) {
  //     console.log("Erro: ", err);
  //   }
  // };

  // const getReviewerFeedbacks = async () => {
  //   try {
  //     if (id) {
  //       getReviewerFeedbacksService(id)
  //         .then((response) => setReviewerFeedbacks(response.data))
  //         .catch((err) => setError(err))
  //         .finally(() => setLoading(false));
  //     }
  //   } catch (err) {
  //     console.log("Erro: ", err);
  //   }
  // };

  return {
    data,
    loading,
    error,
  };
}
