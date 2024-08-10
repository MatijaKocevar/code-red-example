import { create } from "zustand";

interface ApiState {
    loading: boolean;
    error: string | null;
    request: <T>(endpoint: string, options?: RequestInit) => Promise<T | undefined>;
    checkStatus: () => Promise<boolean>;
}

export const useApiStore = create<ApiState>((set) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const tenantId = import.meta.env.VITE_CODE_RED_TENANT_ID;

    const checkStatus = async (): Promise<boolean> => {
        try {
            const response = await fetch(`${baseUrl}/status`);

            if (!response.ok) {
                const errorMessage = `Service status check failed: ${response.status} ${response.statusText}`;

                set({ error: errorMessage });

                return false;
            }

            const result: boolean = await response.json();

            return result;
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred during the status check.";

            set({ error: errorMessage });

            return false;
        }
    };

    const request = async <T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T | undefined> => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${baseUrl}/${tenantId}/${endpoint}`, options);

            if (!response.ok) {
                const errorMessage = `Error: ${response.status} ${response.statusText}`;

                set({ error: errorMessage });
                set({ loading: false });

                return undefined;
            }

            const data: T = await response.json();

            set({ loading: false });

            return data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";

            set({ error: errorMessage, loading: false });

            return undefined;
        }
    };

    return {
        loading: false,
        error: null,
        request,
        checkStatus,
    };
});
