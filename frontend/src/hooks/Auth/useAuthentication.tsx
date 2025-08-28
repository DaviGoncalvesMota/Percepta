import { useState } from "react";
import { login } from "../../services/api";
import type { ILogin } from "../../interfaces/IAuth";
import type { IUsers } from "../../interfaces/IUsers";
import { useEndpoint } from "../Common/useEndpoint";

export function useAuthentication() {
  const [data, setData] = useState<IUsers | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { endpointCurrentUser: endpoint } = useEndpoint();

  const authenticate = async ({ email, password }: ILogin): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(endpoint, { email, password });

      if (response.data) {
        setData(response.data);
        localStorage.setItem("userId", response.data[0].id);
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

  return { data, loading, error, authenticate };
}
