import { create } from "zustand";
import { User } from "../types/user";
import { useApiStore } from "./useApiStore";

interface UsersState {
    users: User[];
    selectedUser: User | null;
    fetchUsers: () => Promise<void>;
    selectUser: (user: User) => void;
    loading: boolean;
}

export const useUsersStore = create<UsersState>((set) => ({
    users: [],
    selectedUser: null,
    loading: false,

    fetchUsers: async () => {
        set({ loading: true });
        const { request } = useApiStore.getState();

        const data = await request<User[]>("user");

        if (data) {
            set({ users: data });
        }
        set({ loading: false });
    },

    selectUser: (user: User) => set({ selectedUser: user }),
}));
