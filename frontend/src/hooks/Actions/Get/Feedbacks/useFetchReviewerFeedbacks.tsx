import { useEffect, useState } from "react";
import { getReviewerFeedbacks } from "../../../../services/api";
import type { IFeedback } from "../../../../interfaces/IFeedback";

export function useFetchReviewerFeedbacks(userId: string) {
  const [data, setData] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      if (userId) {
        getReviewerFeedbacks(userId)
          .then((response) => setData(response.data))
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false));
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }, [userId]);

  return {
    data,
    loading,
    error,
  };
}
