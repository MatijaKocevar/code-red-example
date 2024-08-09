import React from "react";
import { useEvents } from "../hooks/useEvents";
import { Event } from "../types/event";
import CustomList from "../components/CustomList";
import CustomForm from "../components/CustomForm";

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
            <CustomList<Event>
                items={events}
                loading={loading}
                error={error}
                onDelete={handleDelete}
                itemKey={(event) => event.uuid}
                renderItem={(event) => (
                    <>
                        <h3 className="text-lg font-bold text-gray-500">{event.title}</h3>
                        <p className="text-gray-500">Probability: {event.probability}%</p>
                        <p className="text-sm text-gray-500">
                            By: {event.user.firstName} {event.user.lastName}
                        </p>
                    </>
                )}
            />
            <CustomForm
                title={title}
                onTitleChange={(e) => setTitle(e.target.value)}
                additionalFields={
                    <div>
                        <label className="block text-white mb-2">Probability</label>
                        <input
                            type="number"
                            value={probability}
                            onChange={(e) => setProbability(parseInt(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Probability (%)"
                        />
                    </div>
                }
                onSubmit={handleAddEvent}
                submitLabel="Add Event"
            />
        </div>
    );
};

export default EventsPage;
