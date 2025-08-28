import { useState } from "react";
import type { IUsers } from "../../../../interfaces/IUsers";
import { putUser } from "../../../../services/api";
import { useEndpoint } from "../../../Common/useEndpoint";

export function useUpdateUser() {
    const [data, setData] = useState<IUsers | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);
    const { endpointCurrentUser: endpoint } = useEndpoint();

    const updateUser = async (id: string, userData: IUsers) => {
        setLoading(true);
        setError(null);
        try {
            const response = await putUser(endpoint, id, userData);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, updateUser };
}