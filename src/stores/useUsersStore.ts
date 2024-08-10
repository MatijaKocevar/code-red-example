import { create } from "zustand";
import { User } from "../types/user";

const baseUrl = import.meta.env.VITE_API_URL;
const tenantId = import.meta.env.VITE_CODE_RED_TENANT_ID;

interface UsersState {
    users: User[];
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
    selectUser: (user: User) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
    users: [],
    selectedUser: null,
    loading: false,
    error: null,

    fetchUsers: async () => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(`${baseUrl}${tenantId}/user`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data: User[] = await response.json();

            set({ users: data, loading: false });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    selectUser: (user: User) => set({ selectedUser: user }),
}));
