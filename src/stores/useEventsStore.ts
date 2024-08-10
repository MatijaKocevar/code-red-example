import { create } from "zustand";
import { Event } from "../types/event";
import { useApiStore } from "./useApiStore";

interface EventsState {
    events: Event[];
    title: string;
    probability: number;
    fetchEvents: () => Promise<void>;
    setTitle: (title: string) => void;
    setProbability: (probability: number) => void;
    addEvent: () => Promise<void>;
    deleteEvent: (eventId: string) => Promise<void>;
    loading: boolean;
}

export const useEventsStore = create<EventsState>((set, get) => ({
    events: [],
    title: "",
    probability: 0,
    loading: false,

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

    addEvent: async () => {
        const { title, probability, events } = get();
        const { request } = useApiStore.getState();

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
