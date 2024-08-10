import { create } from "zustand";
import { useErrorStore } from "../stores/useErrorStore";

interface ApiState {
    request: <T>(endpoint: string, options?: RequestInit) => Promise<T | undefined>;
    checkStatus: () => Promise<boolean>;
}

export const useApiStore = create<ApiState>(() => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const tenantId = import.meta.env.VITE_CODE_RED_TENANT_ID;
    const { addError } = useErrorStore.getState();

    const checkStatus = async (): Promise<boolean> => {
        try {
            const response = await fetch(`${baseUrl}/status`);

            if (!response.ok) {
                const data = await response.json();

                if (data) {
                    addError(`Service status check failed`);

                    return false;
                }

                addError(`Error: ${response.status} ${response.statusText}`);

                return false;
            }

            const result: boolean = await response.json();

            return result;
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred during the status check.";
            addError(errorMessage);

            return false;
        }
    };

    const request = async <T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T | undefined> => {
        try {
            const response = await fetch(`${baseUrl}/${tenantId}/${endpoint}`, options);

            if (!response.ok) {
                const data = await response.json();

                if (data) {
                    addError(`${data.error}`);

                    return undefined;
                }

                addError(`Error: ${response.status} ${response.statusText}`);

                return undefined;
            }

            const data: T = await response.json();

            return data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
            addError(errorMessage);

            return undefined;
        }
    };

    return {
        request,
        checkStatus,
    };
});
