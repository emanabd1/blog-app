import { atom } from "jotai";

const initialLikedPosts = typeof window !== "undefined"
  ? JSON.parse(window.localStorage.getItem("blog-app-liked-posts") || "[]")
  : [];

const baseLikedPostsAtom = atom(initialLikedPosts);

export const likedPostsAtom = atom(
  (get) => get(baseLikedPostsAtom),
  (get, set, update) => {
    const nextValue = typeof update === "function"
      ? update(get(baseLikedPostsAtom))
      : update;

    set(baseLikedPostsAtom, nextValue);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "blog-app-liked-posts",
        JSON.stringify(nextValue)
      );
    }
  }
);
