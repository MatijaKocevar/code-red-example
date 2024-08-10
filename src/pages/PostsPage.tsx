import { useEffect } from "react";
import { usePostsStore } from "../stores/usePostsStore";
import { Post } from "../types/post";
import CustomList from "../components/custom-list/CustomList";
import CustomForm from "../components/CustomForm";
import CustomListItem from "../components/custom-list/CustomListItem";

const PostsPage = () => {
    const {
        posts,
        title,
        content,
        isValid,
        setTitle,
        setContent,
        fetchPosts,
        addPost,
        deletePost,
        loading,
    } = usePostsStore();

    useEffect(() => {
        if (posts.length === 0) {
            fetchPosts();
        }
    }, [fetchPosts, posts.length]);

    return (
        <div className="flex gap-4 h-full p-8">
            <div className="w-1/2 h-full">
                <CustomList<Post>
                    items={posts}
                    loading={loading}
                    onDelete={deletePost}
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
                    isTitleValid={isValid.title}
                    onTitleChange={(e) => setTitle(e.target.value)}
                    additionalFields={
                        <>
                            <label className="block text-white mb-2">Content</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className={`w-full p-2 border border-gray-300 rounded-md flex-grow ${
                                    isValid.content ? "border-gray-300" : "border-red-500 "
                                }`}
                                placeholder="Content..."
                            />
                        </>
                    }
                    onSubmit={addPost}
                    submitLabel="Add Post"
                />
            </div>
        </div>
    );
};

export default PostsPage;
