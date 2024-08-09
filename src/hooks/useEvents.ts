import { useState, useEffect, useCallback } from "react";
import useApi from "../hooks/useApi";
import { Event } from "../types/event";

export const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [title, setTitle] = useState<string>("");
    const [probability, setProbability] = useState<number>(0);
    const { loading, error, request } = useApi();

    const fetchEvents = useCallback(async () => {
        const data = await request<Event[]>("event");

        if (data) {
            setEvents(data);
        } else {
            console.error("Failed to fetch events");
        }
    }, [request]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleDelete = async (eventId: string) => {
        const response = await request(`event/${eventId}`, {
            method: "DELETE",
        });

        if (response !== undefined) {
            setEvents((prevEvents) => prevEvents.filter((event) => event.uuid !== eventId));
        } else {
            console.error("Failed to delete event");
        }
    };

    const handleAddEvent = async () => {
        const newEvent = {
            user: {
                uuid: "user-uuid",
                firstName: "First",
                lastName: "Last",
            },
            title,
            probability,
        };

        const response = await request<Event>("event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        });

        if (response) {
            setEvents((prevEvents) => [...prevEvents, response]);
            setTitle("");
            setProbability(0);
        } else {
            console.error("Failed to add event");
        }
    };

    return {
        events,
        title,
        probability,
        loading,
        error,
        setTitle,
        setProbability,
        handleDelete,
        handleAddEvent,
    };
};
