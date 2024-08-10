import { useState, useEffect, useCallback } from "react";
import useApi from "../hooks/useApi";
import { Post } from "../types/post";

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const { loading, error, request } = useApi();

    const fetchPosts = useCallback(async () => {
        const data = await request<Post[]>("post");

        if (data) {
            setPosts(data);
        } else {
            console.error("Failed to fetch posts");
        }
    }, [request]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleDelete = async (postId: string) => {
        const response = await request(`post/${postId}`, {
            method: "DELETE",
        });

        if (response) {
            setPosts((prevPosts) => prevPosts.filter((post) => post.uuid !== postId));
        } else {
            console.error("Failed to delete post");
        }
    };

    const handleAddPost = async () => {
        const newPost = {
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

    return {
        posts,
        title,
        content,
        loading,
        error,
        setTitle,
        setContent,
        handleDelete,
        handleAddPost,
    };
};
