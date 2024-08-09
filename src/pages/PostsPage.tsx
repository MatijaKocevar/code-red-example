import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { Post } from "../types/post";

const PostsPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const { loading, error, request } = useApi();

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await request<Post[]>("post");

            const tempData = JSON.parse(JSON.stringify(data)) as Post[];

            data?.push(...tempData);
            data?.push(...tempData);

            if (data) {
                setPosts(data);
            } else {
                console.error("Failed to fetch posts");
            }
        };

        fetchPosts();
    }, [request]);

    const handleDelete = async (postId: string) => {
        const response = await request(`post/${postId}`, {
            method: "DELETE",
        });

        if (response !== undefined) {
            setPosts((prevPosts) => prevPosts.filter((post) => post.uuid !== postId));
        } else {
            console.error("Failed to delete post");
        }
    };

    const handleAddPost = async () => {
        const newPost = {
            user: {
                uuid: "user-uuid",
                firstName: "First",
                lastName: "Last",
            },
            title,
            content,
        };

        const response = await request<Post>("post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
        });

        if (response) {
            setPosts((prevPosts) => [...prevPosts, response]);
            setTitle("");
            setContent("");
        } else {
            console.error("Failed to add post");
        }
    };

    return (
        <div className="flex gap-4 h-full">
            <div className="w-1/2 h-full overflow-y-auto">
                {loading && <div className="m-4">Loading...</div>}
                {error && <div className="m-4 text-red-500">Error: {error}</div>}

                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li
                            key={post.uuid}
                            className="p-4 bg-white shadow-md rounded-md border border-gray-200 flex justify-between items-start h-40"
                        >
                            <div className="flex flex-col flex-grow justify-between h-full">
                                <h3 className="text-lg font-bold text-gray-500">{post.title}</h3>
                                <p className="flex-grow text-gray-500">{post.content}</p>
                                <p className="text-sm text-gray-500">
                                    By: {post.user.firstName} {post.user.lastName}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(post.uuid)}
                                className="bg-red-500 text-black p-2 rounded-md self-end"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-1/2 h-full flex flex-col">
                <div className="mb-4">
                    <label className="block text-white mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4 flex-grow flex flex-col">
                    <label className="block text-white mb-2">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md flex-grow"
                    />
                </div>
                <button onClick={handleAddPost} className="bg-blue-500 text-white p-2 rounded-md">
                    Add Post
                </button>
            </div>
        </div>
    );
};

export default PostsPage;
