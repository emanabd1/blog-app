import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiBookmark,
  FiArrowRight,
} from "react-icons/fi";

import { bookmarksAtom } from "../atoms/bookmarkAtom";

function BlogCard({ post }) {
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);

  const {
    id,
    title,
    body,
    tags,
    reactions,
  } = post;

  const likes =
    typeof reactions === "number"
      ? reactions
      : reactions?.likes ?? 0;

  const isBookmarked = bookmarks.some(
    (item) => item.id === id
  );

  function handleBookmark() {
    if (isBookmarked) {
      setBookmarks(
        bookmarks.filter((item) => item.id !== id)
      );
    } else {
      setBookmarks([...bookmarks, post]);
    }
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <img
        src={`https://picsum.photos/seed/${id}/600/400`}
        alt={title}
        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="p-6">

        <div className="mb-4 flex items-center justify-between">

          <div className="flex flex-wrap gap-2">
            {tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          <button
            onClick={handleBookmark}
            className={`rounded-full p-2 transition ${
              isBookmarked
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <FiBookmark />
          </button>

        </div>

        <h3 className="line-clamp-2 text-2xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-4 line-clamp-3 text-slate-600">
          {body}
        </p>

        <div className="mt-6 flex items-center justify-between">

          <div className="flex items-center gap-2 text-slate-500">
            <FiHeart />
            <span>{likes}</span>
          </div>

          <Link
            to={`/blog/${id}`}
            className="flex items-center gap-2 font-semibold text-blue-600 transition hover:gap-3"
          >
            Read More
            <FiArrowRight />
          </Link>

        </div>

      </div>
    </article>
  );
}

export default BlogCard;