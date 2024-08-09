import React, { useState, useEffect } from "react";

interface User {
    id: string;
    firstName: string;
    lastName: string;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}20a16019-d40a-4d25-9f47-35d82e84064b/user`
                );

                if (!response.ok) {
                    const errorMessage = `Failed to fetch users: ${response.status} ${response.statusText}`;
                    setError(errorMessage);
                    setLoading(false);
                    return;
                }

                const data: User[] = await response.json();

                setUsers(data);
                setLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }

                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div className="m-4">Loading...</div>;
    if (error) return <div className="m-4 text-red-500">Error: {error}</div>;

    return (
        <div className="box-border border-2 border-solid border-red-500 flex w-full h-full flex-col p-4">
            <h1 className="text-xl font-bold mb-4">Users List</h1>
            <ul className="list-disc pl-6">
                {users.map((user) => (
                    <li key={user.id} className="mb-2">
                        {user.firstName} - {user.lastName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;
