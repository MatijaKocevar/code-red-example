import React from "react";

interface PostFormProps {
    title: string;
    content: string;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onAddPost: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
    title,
    content,
    onTitleChange,
    onContentChange,
    onAddPost,
}) => {
    return (
        <div className="w-1/2 h-full flex flex-col">
            <div className="mb-4">
                <label className="block text-white mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={onTitleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4 flex-grow flex flex-col">
                <label className="block text-white mb-2">Content</label>
                <textarea
                    value={content}
                    onChange={onContentChange}
                    className="w-full p-2 border border-gray-300 rounded-md flex-grow"
                />
            </div>
            <button onClick={onAddPost} className="text-white p-2 rounded-md">
                Add Post
            </button>
        </div>
    );
};

export default PostForm;
