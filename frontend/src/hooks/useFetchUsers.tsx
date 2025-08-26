import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IUsers } from "../interfaces/IUsers";
import { getUsers } from "../services/api";

export function useFetchUsers() {
  const [data, setData] = useState<IUsers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      getUsers()
        .then((response) => setData(response.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  }, [navigate]);

  return { data, loading, error };
}
