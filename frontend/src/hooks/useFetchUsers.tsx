import { useState } from "react";
import { getUsersService, getUserByIdService } from "../services/api";
import { useNavigate } from "react-router-dom";
import type { IUsers } from "../interfaces/IUsers";

export function useFetchUsers(id?: string) {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [user, setUser] = useState<IUsers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      getUsersService()
        .then((response) => setUsers(response.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };

  const getUserById = async () => {
    try {
      if (id) {
        getUserByIdService(id)
          .then((response) => setUser(response.data))
          .catch((err) => setError(err))
          .finally(() => setLoading(false));
      }
    } catch (error) {
      console.log("Erro: ", error);
    }
  };

  return { getUsers, getUserById, users, user, loading, error };
}
