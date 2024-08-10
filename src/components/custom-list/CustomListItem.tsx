import React from "react";

interface CustomListItemProps {
    title: string;
    content: string;
    creatorName: string;
}

const CustomListItem: React.FC<CustomListItemProps> = ({ title, content, creatorName }) => {
    return (
        <div className="flex flex-col flex-grow justify-between h-full">
            <h3 className="text-lg font-bold text-gray-500">{title}</h3>
            <p className="flex-grow text-gray-500">{content}</p>
            <p className="text-sm text-gray-500">By: {creatorName}</p>
        </div>
    );
};

export default CustomListItem;
