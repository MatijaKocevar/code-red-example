import { create } from "zustand";
import { Event } from "../types/event";
import { useApiStore } from "./useApiStore";
import { useErrorStore } from "./useErrorStore";

interface EventsState {
    events: Event[];
    title: string;
    probability: number | null;
    loading: boolean;
    isValid: {
        title: boolean;
        probability: boolean;
    };
    fetchEvents: () => Promise<void>;
    setTitle: (title: string) => void;
    setProbability: (probability: number) => void;
    addEvent: () => Promise<void>;
    deleteEvent: (eventId: string) => Promise<void>;
    validateEventFields: () => boolean;
}

export const useEventsStore = create<EventsState>((set, get) => ({
    events: [],
    title: "",
    probability: null,
    loading: false,
    isValid: {
        title: true,
        probability: true,
    },

    fetchEvents: async () => {
        set({ loading: true });
        const { request } = useApiStore.getState();

        const data = await request<Event[]>("event");

        if (data) {
            set({ events: data });
        }
        set({ loading: false });
    },

    setTitle: (title: string) => set({ title }),

    setProbability: (probability: number) => set({ probability }),

    validateEventFields: () => {
        const { title, probability } = get();
        const { addError } = useErrorStore.getState();
        const isValid = {
            title: true,
            probability: true,
        };

        if (!title) {
            addError("Title is required.");
            isValid.title = false;
        }

        if (!probability) {
            addError("Probability is required.");
            isValid.probability = false;
        }

        if (probability !== null && (probability < 1 || probability > 100)) {
            addError("Probability must be between 1 and 100.");
            isValid.probability = false;
        }

        set({ isValid });

        return isValid.title && isValid.probability;
    },

    addEvent: async () => {
        const { title, probability, events, validateEventFields } = get();
        const { request } = useApiStore.getState();

        if (!validateEventFields()) {
            return;
        }

        const newEvent = {
            title,
            probability,
        };

        const addedEvent = await request<Event>("event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        });

        if (addedEvent) {
            set({
                events: [...events, addedEvent],
                title: "",
                probability: 0,
                isValid: {
                    title: true,
                    probability: true,
                },
            });
        }
    },

    deleteEvent: async (eventId: string) => {
        const { request } = useApiStore.getState();

        const response = await request<void>(`event/${eventId}`, {
            method: "DELETE",
        });

        if (response !== undefined) {
            set((state) => ({
                events: state.events.filter((event) => event.uuid !== eventId),
            }));
        }
    },
}));
