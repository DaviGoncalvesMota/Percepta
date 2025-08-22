import { useContext, useState } from "react";
import { loginService } from "../services/api";
import { UserContext } from "../context/User/UserContext";
import { useNavigate } from "react-router-dom";
import type { ILogin } from "../interfaces/IAuth";

export function useAuthentication() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userRole } = useContext(UserContext);

  const authUser = async ({ email, password }: ILogin) => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!userRole) {
      alert("Por favor, selecione o tipo de usuário.");
      return;
    }
    loginService({ email, password })
      .then((response) => {
        if (response.data.length > 0) {
          setData(response.data);
          navigate("/");
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  return { data, authUser, loading, error };
}
