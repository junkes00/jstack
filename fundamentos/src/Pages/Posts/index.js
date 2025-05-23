import React from "react";

import Post from "./Post";
import { Container } from "./styles";

import posts from "./posts";

export default function Posts() {
  return (
    <Container>
      {posts.map((post) => (
        <Post key={post.id} title={post.title} description={post.description} />
      ))}
    </Container>
  );
}
