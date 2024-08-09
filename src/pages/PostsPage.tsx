import React from "react";
import { usePosts } from "../hooks/usePosts";
import { Post } from "../types/post";
import CustomList from "../components/CustomList";
import CustomForm from "../components/CustomForm";

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
        <div className="flex gap-4 h-full p-8">
            <CustomList<Post>
                items={posts}
                loading={loading}
                error={error}
                onDelete={handleDelete}
                itemKey={(post) => post.uuid}
                renderItem={(post) => (
                    <>
                        <h3 className="text-lg font-bold text-gray-500">{post.title}</h3>
                        <p className="flex-grow text-gray-500">{post.content}</p>
                        <p className="text-sm text-gray-500">
                            By: {post.user.firstName} {post.user.lastName}
                        </p>
                    </>
                )}
            />
            <CustomForm
                title={title}
                onTitleChange={(e) => setTitle(e.target.value)}
                additionalFields={
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md flex-grow"
                        placeholder="Content"
                    />
                }
                onSubmit={handleAddPost}
                submitLabel="Add Post"
            />
        </div>
    );
};

export default PostsPage;
