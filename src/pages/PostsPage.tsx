import React from "react";
import { usePosts } from "../hooks/usePosts";
import { Post } from "../types/post";
import CustomList from "../components/custom-list/CustomList";
import CustomForm from "../components/CustomForm";
import CustomListItem from "../components/custom-list/CustomListItem";

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
            <div className="w-1/2 h-full">
                <CustomList<Post>
                    items={posts}
                    loading={loading}
                    error={error}
                    onDelete={handleDelete}
                    itemKey={(post) => post.uuid}
                    renderItem={(post) => (
                        <CustomListItem
                            title={post.title}
                            content={post.content}
                            creatorName={`${post.user.firstName} ${post.user.lastName}`}
                        />
                    )}
                />
            </div>
            <div className="w-1/2 h-full">
                <CustomForm
                    title={title}
                    onTitleChange={(e) => setTitle(e.target.value)}
                    additionalFields={
                        <>
                            <label className="block text-white mb-2">Content</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md flex-grow"
                                placeholder="Content..."
                            />
                        </>
                    }
                    onSubmit={handleAddPost}
                    submitLabel="Add Post"
                />
            </div>
        </div>
    );
};

export default PostsPage;
