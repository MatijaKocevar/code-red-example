import { create } from "zustand";
import { Event } from "../types/event";

const baseUrl = import.meta.env.VITE_API_URL;
const tenantId = import.meta.env.VITE_CODE_RED_TENANT_ID;

interface EventsState {
    events: Event[];
    title: string;
    probability: number;
    loading: boolean;
    error: string | null;
    fetchEvents: () => Promise<void>;
    setTitle: (title: string) => void;
    setProbability: (probability: number) => void;
    addEvent: () => Promise<void>;
    deleteEvent: (eventId: string) => Promise<void>;
}

export const useEventsStore = create<EventsState>((set, get) => ({
    events: [],
    title: "",
    probability: 0,
    loading: false,
    error: null,

    fetchEvents: async () => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(`${baseUrl}${tenantId}/event`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data: Event[] = await response.json();

            set({ events: data, loading: false });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    setTitle: (title: string) => set({ title }),

    setProbability: (probability: number) => set({ probability }),

    addEvent: async () => {
        const { title, probability, events } = get();
        const newEvent = {
            title,
            probability,
        };

        set({ loading: true, error: null });

        try {
            const response = await fetch(`${baseUrl}${tenantId}/event`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEvent),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const addedEvent: Event = await response.json();

            set({
                events: [...events, addedEvent],
                title: "",
                probability: 0,
                loading: false,
            });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    deleteEvent: async (eventId: string) => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(`${baseUrl}${tenantId}/event/${eventId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            set((state) => ({
                events: state.events.filter((event) => event.uuid !== eventId),
                loading: false,
            }));
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },
}));
