import { createPersistedAtom } from "./persistedAtom";

export const likedPostsAtom = createPersistedAtom("blog-app-liked-posts", []);
