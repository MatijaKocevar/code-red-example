import React from "react";
import { useEvents } from "../hooks/useEvents";
import EventList from "../components/events/EventList";
import EventForm from "../components/events/EventForm";

const EventsPage: React.FC = () => {
    const {
        events,
        title,
        probability,
        loading,
        error,
        setTitle,
        setProbability,
        handleDelete,
        handleAddEvent,
    } = useEvents();

    return (
        <div className="flex gap-4 h-full p-8">
            <EventList events={events} loading={loading} error={error} onDelete={handleDelete} />
            <EventForm
                title={title}
                probability={probability}
                onTitleChange={(e) => setTitle(e.target.value)}
                onProbabilityChange={(e) => setProbability(parseInt(e.target.value))}
                onAddEvent={handleAddEvent}
            />
        </div>
    );
};

export default EventsPage;
