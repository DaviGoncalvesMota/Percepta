import { useEffect, useState } from "react";
import type { IUsers } from "../interfaces/IUsers";
import { getUserById } from "../services/api";
import { useEndpoint } from "./useEndpoint";

export function useFetchUserById(id: string) {
    const [data, setData] = useState<IUsers[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const endpoint = useEndpoint();

    useEffect(() => {
        try {
            getUserById(endpoint, id)
                .then((response) => setData(response.data))
                .catch((err) => setError(err))
                .finally(() => setLoading(false));
        } catch (err) {
            console.log("Erro: ", err);
        }
    }, [id, endpoint]);

    return { data, loading, error };
}