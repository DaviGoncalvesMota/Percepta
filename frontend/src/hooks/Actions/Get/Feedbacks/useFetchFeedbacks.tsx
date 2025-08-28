import { useEffect, useState } from "react";
import type { IFeedback } from "../../../../interfaces/IFeedback";
import { getFeedbacks } from "../../../../services/api";

export function useFetchFeedbacks() {
  const [data, setData] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      getFeedbacks()
        .then((response) => setData(response.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    } catch (err) {
      console.log("Erro: ", err);
    }
  }, []);

  return {
    data,
    loading,
    error,
  };
}
