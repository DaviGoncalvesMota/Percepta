import { useContext, useState } from "react";
import type { IFeedback } from "../../../../interfaces/IFeedback";
import { putFeedback } from "../../../../services/api";
import { ReviewContext } from "../../../../context/Review/ReviewContext";

export function useUpdateFeedback() {
    const [data, setData] = useState<IFeedback>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const { setRevieweeName } = useContext(ReviewContext)

    const updateFeedback = async (id: string, feedback: IFeedback) => {
        setLoading(true)
        setError(null)
        try {
            const response = await putFeedback(id, feedback)

            if(response.data) {
                setData(response.data[0])
                setRevieweeName("")
            }
        }
        catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, updateFeedback };
    
}