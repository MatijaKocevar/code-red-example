import React, { useEffect } from "react";
import UserDetails from "../components/UserDetails";
import CustomList from "../components/custom-list/CustomList";
import { useUsersStore } from "../stores/useUsersStore";
import { User } from "../types/user";

const UsersPage: React.FC = () => {
    const { users, selectedUser, loading, error, fetchUsers, selectUser } = useUsersStore();

    useEffect(() => {
        if (users.length === 0) {
            fetchUsers();
        }
    }, [fetchUsers, users.length]);

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
                        <div className="p-4 flex justify-center items-center bg-white rounded-md cursor-pointer text-center h-full">
                            <div className="text-3xl font-medium text-gray-700">
                                {user.firstName} {user.lastName}
                            </div>
                        </div>
                    )}
                    showDeleteButton={false}
                    onItemClick={(user) => selectUser(user)}
                />
            </div>
            <div className="w-1/2 h-full">
                <UserDetails user={selectedUser} />
            </div>
        </div>
    );
};

export default UsersPage;
