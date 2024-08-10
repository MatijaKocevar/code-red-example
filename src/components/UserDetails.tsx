import { User } from "../types/user";

interface UserDetailsProps {
    user: User | null;
}

const UserDetails = ({ user }: UserDetailsProps) => {
    if (!user) {
        return <div className="text-gray-500">Select a user to see the details</div>;
    }

    return (
        <div className="bg-white p-4 shadow-md rounded-md border border-gray-200 h-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">User Details</h2>
            <p className="text-gray-500">
                <strong>ID:</strong> {user.uuid}
            </p>
            <p className="text-gray-500">
                <strong>First Name:</strong> {user.firstName}
            </p>
            <p className="text-gray-500">
                <strong>Last Name:</strong> {user.lastName}
            </p>
        </div>
    );
};

export default UserDetails;
