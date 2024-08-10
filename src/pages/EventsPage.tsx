import React from "react";
import { useEvents } from "../hooks/useEvents";
import { Event } from "../types/event";
import CustomList from "../components/custom-list/CustomList";
import CustomForm from "../components/CustomForm";
import CustomListItem from "../components/custom-list/CustomListItem";

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
            <div className="w-1/2 h-full">
                <CustomList<Event>
                    items={events}
                    loading={loading}
                    error={error}
                    onDelete={handleDelete}
                    itemKey={(event) => event.uuid}
                    renderItem={(event) => (
                        <CustomListItem
                            title={event.title}
                            content={`Probability: ${event.probability}%`}
                            creatorName={`${event.user.firstName} ${event.user.lastName}`}
                        />
                    )}
                />
            </div>
            <div className="w-1/2 h-full">
                <CustomForm
                    title={title}
                    onTitleChange={(e) => setTitle(e.target.value)}
                    additionalFields={
                        <>
                            <label className="block text-white mb-2">Probability</label>
                            <input
                                type="number"
                                value={probability}
                                onChange={(e) => setProbability(parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="0"
                            />
                        </>
                    }
                    onSubmit={handleAddEvent}
                    submitLabel="Add Event"
                />
            </div>
        </div>
    );
};

export default EventsPage;
