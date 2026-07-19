import { atom } from "jotai";

const initialCustomPosts = typeof window !== "undefined"
  ? JSON.parse(window.localStorage.getItem("blog-app-custom-posts") || "[]")
  : [];

const baseCustomPostsAtom = atom(initialCustomPosts);

export const customPostsAtom = atom(
  (get) => get(baseCustomPostsAtom),
  (get, set, update) => {
    const nextPosts = typeof update === "function"
      ? update(get(baseCustomPostsAtom))
      : update;

    set(baseCustomPostsAtom, nextPosts);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "blog-app-custom-posts",
        JSON.stringify(nextPosts)
      );
    }
  }
);
