import React from "react";
import UserDetails from "../components/UserDetails";
import { useUsers } from "../hooks/useUsers";
import CustomList from "../components/custom-list/CustomList";
import { User } from "../types/user";

const UsersPage: React.FC = () => {
    const { users, selectedUser, loading, error, handleUserClick } = useUsers();

    if (loading) return <div className="m-4">Loading...</div>;
    if (error) return <div className="m-4 text-red-500">Error: {error}</div>;

    return (
        <div className="h-full flex gap-8 p-8">
            <div className="w-1/2 h-full">
                <CustomList<User>
                    items={users}
                    loading={loading}
                    error={error}
                    itemKey={(user) => user.uuid}
                    renderItem={(user) => (
                        <>
                            <div className="p-4 flex justify-center items-center bg-white rounded-md cursor-pointer text-center h-full">
                                <div className="text-3xl font-medium text-gray-700">
                                    {user.firstName} {user.lastName}
                                </div>
                            </div>
                        </>
                    )}
                    showDeleteButton={false}
                    onItemClick={(item) => handleUserClick(item)}
                />
            </div>
            <div className="w-1/2 h-full">
                <UserDetails user={selectedUser} />
            </div>
        </div>
    );
};

export default UsersPage;
