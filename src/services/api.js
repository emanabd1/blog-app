const BASE_URL = "https://dummyjson.com";

export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts?limit=10`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();

  return data.posts;
}

export async function getPost(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return await response.json();
}

export async function getComments(id) {
  const response = await fetch(
    `${BASE_URL}/comments/post/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  const data = await response.json();

  return data.comments;
}