import { createHashRouter } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import EventsPage from "./pages/EventsPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";

const router = createHashRouter([
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
]);

export default router;
