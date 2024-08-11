import { useErrorStore } from "../stores/useErrorStore";

const ErrorDisplay = () => {
    const { errors, removeError } = useErrorStore();

    return (
        <div className="fixed top-4 right-4 z-[10000] max-h-full max-w-80 overflow-y-auto flex flex-col space-y-2 pointer-events-none">
            {errors.map((error) => (
                <div
                    key={error.id}
                    className="bg-red-500 text-white p-4 rounded shadow-md cursor-pointer pointer-events-auto"
                    onClick={() => removeError(error.id)}
                >
                    <div className="flex justify-between items-center">
                        <span
                            title={error.message}
                            className="whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                            {error.message}
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeError(error.id);
                            }}
                            className="ml-4 text-white font-bold"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ErrorDisplay;
