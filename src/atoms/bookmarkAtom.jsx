import { atom } from "jotai";

const initialBookmarks = typeof window !== "undefined"
  ? JSON.parse(window.localStorage.getItem("blog-app-bookmarks") || "[]")
  : [];

const baseBookmarksAtom = atom(initialBookmarks);

export const bookmarksAtom = atom(
  (get) => get(baseBookmarksAtom),
  (get, set, update) => {
    const nextBookmarks = typeof update === "function"
      ? update(get(baseBookmarksAtom))
      : update;

    set(baseBookmarksAtom, nextBookmarks);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "blog-app-bookmarks",
        JSON.stringify(nextBookmarks)
      );
    }
  }
);
