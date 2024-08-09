import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import UserItem from "../components/users/UserItem";
import UserDetails from "../components/users/UserDetails";
import { User } from "../types/user";

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
        <div className="h-full flex">
            <div className="w-1/2 pr-4 h-full overflow-y-auto">
                <ul className="space-y-4">
                    {users.map((user) => (
                        <UserItem key={user.uuid} user={user} onClick={handleUserClick} />
                    ))}
                </ul>
            </div>

            {/* 
                This is an assumption I made to show something on the right side. 
                With minimal effort the list of users can be expanded to the full width of the page. 
            */}
            <div className="w-1/2 pl-4 h-full">
                <UserDetails user={selectedUser} />
            </div>
        </div>
    );
};

export default UsersPage;
