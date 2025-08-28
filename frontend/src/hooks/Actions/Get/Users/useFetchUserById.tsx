import { useEffect, useState } from "react";
import type { IUsers } from "../../../../interfaces/IUsers";
import { getUserById } from "../../../../services/api";
import { useEndpoint } from "../../../Common/useEndpoint";

export function useFetchUserById(id: string) {
    const [data, setData] = useState<IUsers | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);
    const { endpointCurrentUser: endpoint } = useEndpoint();

    useEffect(() => {
        setLoading(true);
        setError(null);

        getUserById(endpoint, id)
            .then((response) => setData(response.data[0]))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [id, endpoint]);

    return { data, loading, error };
}
