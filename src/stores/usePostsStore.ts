import { create } from "zustand";
import { Post } from "../types/post";
import { useApiStore } from "./useApiStore";
import { useErrorStore } from "./useErrorStore";

interface PostsState {
    posts: Post[];
    title: string;
    content: string;
    isValid: {
        title: boolean;
        content: boolean;
    };
    fetchPosts: () => Promise<void>;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    addPost: () => Promise<void>;
    deletePost: (postId: string) => Promise<void>;
    loading: boolean;
    validatePostFields: () => boolean;
}

export const usePostsStore = create<PostsState>((set, get) => ({
    posts: [],
    title: "",
    content: "",
    loading: false,
    isValid: {
        title: true,
        content: true,
    },

    fetchPosts: async () => {
        set({ loading: true });
        const { request } = useApiStore.getState();

        const data = await request<Post[]>("post");

        if (data) {
            set({ posts: data });
        }

        set({ loading: false });
    },

    setTitle: (title: string) => set({ title }),

    setContent: (content: string) => set({ content }),

    validatePostFields: () => {
        const { title, content } = get();
        const { addError } = useErrorStore.getState();
        const isValid = {
            title: true,
            content: true,
        };

        if (!title) {
            addError("Title is required.");
            isValid.title = false;
        }

        if (!content) {
            addError("Content is required.");
            isValid.content = false;
        }

        set({ isValid });

        return isValid.title && isValid.content;
    },

    addPost: async () => {
        const { title, content, posts, validatePostFields } = get();
        const { request } = useApiStore.getState();

        if (!validatePostFields()) {
            return;
        }

        const newPost = {
            title,
            content,
        };

        const addedPost = await request<Post>("post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
        });

        if (addedPost) {
            set({
                posts: [...posts, addedPost],
                title: "",
                content: "",
                isValid: {
                    title: true,
                    content: true,
                },
            });
        }
    },

    deletePost: async (postId: string) => {
        const { request } = useApiStore.getState();

        const response = await request<void>(`post/${postId}`, {
            method: "DELETE",
        });

        if (response !== undefined) {
            set((state) => ({
                posts: state.posts.filter((post) => post.uuid !== postId),
            }));
        }
    },
}));
