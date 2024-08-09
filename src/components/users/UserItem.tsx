import React from "react";
import { User } from "../../types/user";

interface UserItemProps {
    user: User;
    onClick: (user: User) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onClick }) => {
    return (
        <li className="p-4 bg-white rounded-md cursor-pointer" onClick={() => onClick(user)}>
            <div className="flex items-center space-x-4">
                <div className="text-lg font-medium text-gray-700">
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </li>
    );
};

export default UserItem;
