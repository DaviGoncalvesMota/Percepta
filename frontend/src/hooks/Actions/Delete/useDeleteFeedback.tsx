import { useState } from "react";
import type { IFeedback } from "../../../interfaces/IFeedback";
import { deleteFeedback } from "../../../services/api";

export const useDeleteFeedback = () => {
  const [data, setData] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const delFeedback = async (id: string) => {
    setLoading(true);
    try {
      const response = await deleteFeedback(id);
      if (response) {
        setData((prev) => prev.filter((f) => f.id !== id));
        return true;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, delFeedback };
};
