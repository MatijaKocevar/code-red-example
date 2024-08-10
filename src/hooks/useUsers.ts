import { useState, useEffect, useCallback } from "react";
import useApi from "../hooks/useApi";
import { User } from "../types/user";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { loading, error, request } = useApi();

    const fetchUsers = useCallback(async () => {
        const data = await request<User[]>("user");

        if (data) {
            setUsers(data);
        } else {
            console.error("Failed to fetch users");
        }
    }, [request]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    return {
        users,
        selectedUser,
        loading,
        error,
        handleUserClick,
    };
};
