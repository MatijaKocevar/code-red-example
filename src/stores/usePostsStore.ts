import { create } from "zustand";
import { Post } from "../types/post";
import { useApiStore } from "./useApiStore";

interface PostsState {
    posts: Post[];
    title: string;
    content: string;
    fetchPosts: () => Promise<void>;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    addPost: () => Promise<void>;
    deletePost: (postId: string) => Promise<void>;
    loading: boolean;
}

export const usePostsStore = create<PostsState>((set, get) => ({
    posts: [],
    title: "",
    content: "",
    loading: false,

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

    addPost: async () => {
        const { title, content, posts } = get();
        const { request } = useApiStore.getState();

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
