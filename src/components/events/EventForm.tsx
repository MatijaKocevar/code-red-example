import React from "react";

interface EventFormProps {
    title: string;
    probability: number;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onProbabilityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddEvent: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
    title,
    probability,
    onTitleChange,
    onProbabilityChange,
    onAddEvent,
}) => {
    return (
        <div className="w-1/2 h-full flex flex-col">
            <div className="mb-4">
                <label className="block text-white mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={onTitleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2">Probability (%)</label>
                <input
                    type="number"
                    value={probability}
                    onChange={onProbabilityChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <button onClick={onAddEvent} className="bg-blue-500 text-white p-2 rounded-md">
                Add Event
            </button>
        </div>
    );
};

export default EventForm;
