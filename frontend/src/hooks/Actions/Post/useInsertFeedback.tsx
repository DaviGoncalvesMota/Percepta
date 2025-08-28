import { useContext, useState } from "react";
import type { IFeedback } from "../../../interfaces/IFeedback";
import { postFeedback } from "../../../services/api";
import { ReviewContext } from "../../../context/Review/ReviewContext";

export function useInsertFeedback() {
  const [data, setData] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setRevieweeName } = useContext(ReviewContext)

  const insertFeedback = async (data: IFeedback) => {
    setLoading(true);
    setError(null);

    try {
      const response = await postFeedback(data);

      if (response.data) {
        setData((prevData) => [...prevData, response.data]);
        setRevieweeName("");
        return true;
      }

      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, insertFeedback };
}
