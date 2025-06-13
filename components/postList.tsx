"use client";

import { Post, deletePost } from "../services/post";
import { SetState } from "@/types";

type Props = {
  posts: Post[];
  setPosts: SetState<Post[]>;
  setSelectedPost: SetState<Post | null>;
};

export function PostList({ posts, setPosts, setSelectedPost }: Props) {
  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  return (
    <ul className="space-y-2">
      {posts.map((post) => (
        <li key={post.id} className="border p-3 rounded">
          <h2 className="font-bold">{post.title}</h2>
          <p>{post.body}</p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => setSelectedPost(post)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
