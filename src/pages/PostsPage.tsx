import React from "react";
import { usePosts } from "../hooks/usePosts";
import PostList from "../components/posts/PostList";
import PostForm from "../components/posts/PostForm";

const PostsPage: React.FC = () => {
    const {
        posts,
        title,
        content,
        loading,
        error,
        setTitle,
        setContent,
        handleDelete,
        handleAddPost,
    } = usePosts();

    return (
        <div className="flex gap-8 h-full">
            <PostList posts={posts} loading={loading} error={error} onDelete={handleDelete} />
            <PostForm
                title={title}
                content={content}
                onTitleChange={(e) => setTitle(e.target.value)}
                onContentChange={(e) => setContent(e.target.value)}
                onAddPost={handleAddPost}
            />
        </div>
    );
};

export default PostsPage;
