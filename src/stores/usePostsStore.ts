import { create } from "zustand";
import { Post } from "../types/post";

const baseUrl = import.meta.env.VITE_API_URL;
const tenantId = import.meta.env.VITE_CODE_RED_TENANT_ID;

interface PostsState {
    posts: Post[];
    title: string;
    content: string;
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    addPost: () => Promise<void>;
    deletePost: (postId: string) => Promise<void>;
}

export const usePostsStore = create<PostsState>((set, get) => ({
    posts: [],
    title: "",
    content: "",
    loading: false,
    error: null,

    fetchPosts: async () => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(`${baseUrl}${tenantId}/post`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data: Post[] = await response.json();

            set({ posts: data, loading: false });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    setTitle: (title: string) => set({ title }),

    setContent: (content: string) => set({ content }),

    addPost: async () => {
        const { title, content, posts } = get();
        const newPost = {
            title,
            content,
        };

        set({ loading: true, error: null });

        try {
            const response = await fetch(`${baseUrl}${tenantId}/post`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const addedPost: Post = await response.json();

            set({ posts: [...posts, addedPost], title: "", content: "", loading: false });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    deletePost: async (postId: string) => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(`${baseUrl}${tenantId}/post/${postId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            set((state) => ({
                posts: state.posts.filter((post) => post.uuid !== postId),
                loading: false,
            }));
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },
}));
