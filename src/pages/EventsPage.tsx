import { useEffect } from "react";
import { useEventsStore } from "../stores/useEventsStore";
import { Event } from "../types/event";
import CustomList from "../components/custom-list/CustomList";
import CustomForm from "../components/CustomForm";
import CustomListItem from "../components/custom-list/CustomListItem";

const EventsPage = () => {
    const {
        events,
        title,
        probability,
        loading,
        isValid,
        setTitle,
        setProbability,
        fetchEvents,
        addEvent,
        deleteEvent,
    } = useEventsStore();

    useEffect(() => {
        if (events.length === 0) {
            fetchEvents();
        }
    }, [fetchEvents, events.length]);

    return (
        <div className="flex gap-4 h-full p-8">
            <div className="w-1/2 h-full">
                <CustomList<Event>
                    items={events}
                    loading={loading}
                    onDelete={deleteEvent}
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
                    isTitleValid={isValid.title}
                    onTitleChange={(e) => setTitle(e.target.value)}
                    additionalFields={
                        <>
                            <label className="block text-white mb-2">Probability</label>
                            <input
                                type="number"
                                value={probability ?? ""}
                                onChange={(e) => setProbability(parseInt(e.target.value))}
                                className={`w-full p-2 border border-gray-300 rounded-md ${
                                    isValid.probability ? "border-gray-300" : "border-red-500 "
                                }`}
                                placeholder="0-100"
                            />
                        </>
                    }
                    onSubmit={addEvent}
                    submitLabel="Add Event"
                />
            </div>
        </div>
    );
};

export default EventsPage;
