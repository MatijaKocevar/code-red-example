import React from "react";

interface CustomFormProps {
    title: string;
    isTitleValid: boolean;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    additionalFields?: React.ReactNode;
    onSubmit: () => void;
    submitLabel: string;
}

const CustomForm = ({
    title,
    isTitleValid,
    onTitleChange,
    additionalFields,
    onSubmit,
    submitLabel,
}: CustomFormProps) => {
    return (
        <div className="h-full flex flex-col">
            <div className="mb-4">
                <label className="block text-white mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={onTitleChange}
                    className={`w-full p-2 border border-gray-300 rounded-md ${
                        isTitleValid ? "border-gray-300" : "border-red-500"
                    }`}
                />
            </div>
            {additionalFields && (
                <div className="mb-4 flex-grow flex flex-col">{additionalFields}</div>
            )}
            <button onClick={onSubmit} className="bg-blue-500 text-white p-2 rounded-md">
                {submitLabel}
            </button>
        </div>
    );
};

export default CustomForm;
