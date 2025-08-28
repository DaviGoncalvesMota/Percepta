import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IUsers } from "../../../../interfaces/IUsers";
import { getUsers } from "../../../../services/api";
import { useEndpoint } from "../../../Common/useEndpoint";

export function useFetchUsers() {
  const [data, setData] = useState<IUsers[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { endpointAllUsers: endpoint } = useEndpoint();

  useEffect(() => {
    try {
      setLoading(true);
      getUsers(endpoint)
        .then((response) => setData(response.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  }, [navigate, endpoint]);

  return { data, loading, error };
}
