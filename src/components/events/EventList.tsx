import React from "react";
import { Event } from "../../types/event";

interface EventListProps {
    events: Event[];
    loading: boolean;
    error: string | null;
    onDelete: (eventId: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, loading, error, onDelete }) => {
    return (
        <div className="w-1/2 h-full overflow-y-auto">
            {loading && <div className="m-4">Loading...</div>}
            {error && <div className="m-4 text-red-500">Error: {error}</div>}

            <ul className="space-y-4">
                {events.map((event) => (
                    <li
                        key={event.uuid}
                        className="p-4 bg-white shadow-md rounded-md border border-gray-200 flex justify-between items-start h-40"
                    >
                        <div className="flex flex-col flex-grow justify-between h-full">
                            <h3 className="text-lg font-bold text-gray-500">{event.title}</h3>
                            <p className="text-gray-500">Probability: {event.probability}%</p>
                            <p className="text-sm text-gray-500">
                                By: {event.user.firstName} {event.user.lastName}
                            </p>
                        </div>
                        <button
                            onClick={() => onDelete(event.uuid)}
                            className="bg-red-500 text-black p-2 rounded-md self-end"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
