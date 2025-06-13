"use client";

import { FormEvent, useState, useEffect } from "react";
import { Post, createPost, updatePost } from "@/services/post";

type Props = {
  userId: number;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export function PostForm({
  userId,
  posts,
  setPosts,
  selectedPost,
  setSelectedPost,
}: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setBody(selectedPost.body);
    }
  }, [selectedPost]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (selectedPost) {
        const updated = await updatePost(selectedPost.id, {
          title,
          body,
          userId: 0,
        });
        setPosts(posts.map((p) => (p.id === updated.id ? updated : p)));
        setSuccess("Post updated!");
      } else {
        const created = await createPost({ title, body, userId });
        setPosts([created, ...posts]);
        setSuccess("Post created!");
      }
      setTitle("");
      setBody("");
      setSelectedPost(null);
    } catch {
      setSuccess("Failed to save post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {selectedPost ? "Update Post" : "Create Post"}
      </button>
      {success && <p className="text-green-600">{success}</p>}
    </form>
  );
}
