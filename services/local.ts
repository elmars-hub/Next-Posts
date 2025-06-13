import { Post } from "./post";

const LOCAL_KEY = "my_posts";

export const savePostsToLocal = (posts: Post[]) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(posts));
};

export const getPostsFromLocal = (): Post[] => {
  const stored = localStorage.getItem(LOCAL_KEY);
  return stored ? JSON.parse(stored) : [];
};
