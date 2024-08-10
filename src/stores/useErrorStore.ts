import { create } from "zustand";

interface Error {
    id: string;
    message: string;
}

interface ErrorState {
    errors: Error[];
    addError: (message: string) => void;
    removeError: (id: string) => void;
    clearErrors: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
    errors: [],

    addError: (message: string) => {
        const id = Date.now().toString();
        set((state) => ({
            errors: [...state.errors, { id, message }],
        }));
    },

    removeError: (id: string) => {
        set((state) => ({
            errors: state.errors.filter((error) => error.id !== id),
        }));
    },

    clearErrors: () => {
        set({ errors: [] });
    },
}));
