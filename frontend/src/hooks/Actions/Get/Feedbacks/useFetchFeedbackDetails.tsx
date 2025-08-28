import { useEffect, useState } from "react";
import type { IFeedback } from "../../../../interfaces/IFeedback";
import { getFeedbackDetails } from "../../../../services/api";

export function useFetchFeedbackDetails(id: string) {
  const [data, setData] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      getFeedbackDetails(id)
        .then((response) => setData(response.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    } catch (err) {
      console.log("Erro: ", err);
    }
  }, [id]);

  return { data, loading, error };
}