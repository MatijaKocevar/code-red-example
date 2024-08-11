import { createBrowserRouter } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import EventsPage from "./pages/EventsPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";

const baseUrl = import.meta.env.VITE_BASE_URL;

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                { index: true, element: <HomePage /> },
                { path: "users", element: <UsersPage /> },
                { path: "posts", element: <PostsPage /> },
                { path: "events", element: <EventsPage /> },
            ],
        },
    ],
    { basename: baseUrl }
);

export default router;
