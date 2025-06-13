"use client";

import { PostForm } from "@/components/postForm";
import { PostList } from "@/components/postList";
import { Post, getPosts } from "@/services/post";
import { useEffect, useState } from "react";
import { getPostsFromLocal, savePostsToLocal } from "@/services/local";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [userId] = useState(1);

  useEffect(() => {
    const local = getPostsFromLocal();
    if (local.length) {
      setPosts(local);
    } else {
      async function load() {
        const data = await getPosts();
        if (Array.isArray(data)) {
          const limited = data.slice(0, 5);
          setPosts(limited);
          savePostsToLocal(limited);
        }
      }
      load();
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Post Manager</h1>
      <PostForm
        userId={userId}
        posts={posts}
        setPosts={setPosts}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
      <PostList
        posts={posts}
        setPosts={setPosts}
        setSelectedPost={setSelectedPost}
      />
    </div>
  );
}
