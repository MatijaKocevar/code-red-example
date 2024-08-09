import { useState, useCallback } from "react";

interface ApiHookResult<T> {
    loading: boolean;
    error: string | null;
    request: (endpoint: string, options?: RequestInit) => Promise<T | undefined>;
    checkStatus: () => Promise<boolean>;
}

const useApi = <T>(): ApiHookResult<T> => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const baseUrl = import.meta.env.VITE_API_URL;
    const tenantId = import.meta.env.VITE_CODE_RED_TENANT_ID;

    const checkStatus = useCallback(async (): Promise<boolean> => {
        try {
            const response = await fetch(`${baseUrl}status`);

            if (!response.ok) {
                const errorMessage = `Service status check failed: ${response.status} ${response.statusText}`;
                setError(errorMessage);
                return false;
            }

            const result: boolean = await response.json();

            return result;
        } catch (err) {
            if (err instanceof Error) {
                setError(`Service status check failed: ${err.message}`);
            } else {
                setError("An unknown error occurred during the status check.");
            }

            return false;
        }
    }, [baseUrl]);

    const request = useCallback(
        async (endpoint: string, options: RequestInit = {}): Promise<T | undefined> => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${baseUrl}${tenantId}/${endpoint}`, options);

                if (!response.ok) {
                    const errorMessage = `Error: ${response.status} ${response.statusText}`;
                    setError(errorMessage);
                    setLoading(false);
                    return undefined;
                }

                const data: T = await response.json();

                setLoading(false);

                return data;
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }

                setLoading(false);

                return undefined;
            }
        },
        [baseUrl, tenantId]
    );

    return { loading, error, request, checkStatus };
};

export default useApi;
