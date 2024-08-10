import React from "react";

interface CustomListProps<T> {
    items: T[];
    loading: boolean;
    error: string | null;
    renderItem: (item: T) => React.ReactNode;
    itemKey: (item: T) => string;
    showDeleteButton?: boolean;
    onDelete?: (id: string) => void;
    onItemClick?: (item: T) => void;
}

const CustomList = <T extends { uuid: string }>({
    items,
    loading,
    error,
    renderItem,
    itemKey,
    showDeleteButton = true,
    onDelete,
    onItemClick,
}: CustomListProps<T>) => {
    return (
        <div className="h-full overflow-y-auto">
            {loading && <div className="m-4">Loading...</div>}
            {error && <div className="m-4 text-red-500">Error: {error}</div>}

            <ul className="space-y-4">
                {items.map((item) => (
                    <li
                        key={itemKey(item)}
                        className="p-4 bg-white shadow-md rounded-md border border-gray-200 flex justify-between items-start h-40 cursor-pointer"
                        onClick={() => onItemClick?.(item)}
                    >
                        <div className="flex flex-col flex-grow justify-between h-full">
                            {renderItem(item)}
                        </div>
                        {showDeleteButton && onDelete && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(item.uuid);
                                }}
                                className="bg-red-500 text-black p-2 rounded-md self-end"
                            >
                                Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomList;
