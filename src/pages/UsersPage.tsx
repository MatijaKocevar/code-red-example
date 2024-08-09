import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import UserDetails from "../components/users/UserDetails";
import { User } from "../types/user";
import CustomList from "../components/CustomList";
import UserItem from "../components/users/UserItem";

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { loading, error, request } = useApi();

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await request<User[]>("user");

            if (data) {
                setUsers(data);
            } else {
                console.error("Failed to fetch users");
            }
        };

        fetchUsers();
    }, [request]);

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    if (loading) return <div className="m-4">Loading...</div>;
    if (error) return <div className="m-4 text-red-500">Error: {error}</div>;

    return (
        <div className="h-full flex gap-8 p-8">
            <CustomList<User>
                items={users}
                loading={loading}
                error={error}
                onDelete={() => {}}
                itemKey={(user) => user.uuid}
                renderItem={(user) => (
                    <UserItem key={user.uuid} user={user} onClick={handleUserClick} />
                )}
            />

            <div className="w-1/2 h-full">
                <UserDetails user={selectedUser} />
            </div>
        </div>
    );
};

export default UsersPage;
