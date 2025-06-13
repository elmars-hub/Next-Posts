import axios from "axios";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async (): Promise<Post[]> => {
  const res = await axios.get<Post[]>(API_URL);
  return res.data;
};

export const createPost = async (data: Omit<Post, "id">): Promise<Post> => {
  const res = await axios.post<Post>(API_URL, data);
  return {
    ...res.data,
    id: Date.now(),
  };
};

export const updatePost = async (
  id: number,
  data: Omit<Post, "id">
): Promise<Post> => {
  if (id > 100) {
    // fake update for local-only posts
    return { ...data, id, userId: 1 };
  }

  const res = await axios.put<Post>(`${API_URL}/${id}`, data);
  return res.data;
};

export const deletePost = async (id: number): Promise<void> => {
  const res = await axios.delete<Post>(`${API_URL}/${id}`);
};
