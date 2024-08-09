import React from "react";
import { Post } from "../../types/post";

interface PostListProps {
    posts: Post[];
    loading: boolean;
    error: string | null;
    onDelete: (postId: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, loading, error, onDelete }) => {
    if (loading) return <div className="w-1/2 h-full m-4">Loading...</div>;
    if (error) return <div className="w-1/2 h-full m-4 text-red-500">Error: {error}</div>;

    return (
        <div className="w-1/2 h-full overflow-y-auto">
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li
                        key={post.uuid}
                        className="p-4 bg-white shadow-md rounded-md border border-gray-200 flex justify-between items-start h-40"
                    >
                        <div className="flex flex-col flex-grow justify-between h-full">
                            <h3 className="text-lg font-bold text-black">{post.title}</h3>
                            <p className="flex-grow text-gray-500">{post.content}</p>
                            <p className="text-sm text-gray-800">
                                By: {post.user.firstName} {post.user.lastName}
                            </p>
                        </div>
                        <button
                            onClick={() => onDelete(post.uuid)}
                            className="bg-red-500 text-black p-2 rounded-md self-end"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
