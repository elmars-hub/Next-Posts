import React from "react";

interface PostListProps {
  posts: React.ReactNode;
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return <div>{posts}</div>;
};

export default PostList;
