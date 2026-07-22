import { useAtom } from "jotai";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiBookmark, FiArrowRight } from "react-icons/fi";

import { bookmarksAtom } from "../atoms/bookmarkAtom";
import { likedPostsAtom } from "../atoms/likesAtom";
import { customPostsAtom } from "../atoms/postAtom";
import { getPostImageUrl } from "../utils/postImage";

function BlogCard({ post }) {
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);
  const [customPosts, setCustomPosts] = useAtom(customPostsAtom);
  const [likedPosts, setLikedPosts] = useAtom(likedPostsAtom);
  const navigate = useNavigate();

  const { id, title, body, tags, reactions, isCustom } = post;
  const likes = typeof reactions === "number" ? reactions : reactions?.likes ?? 0;
  const isLiked = likedPosts.includes(id);
  const displayedLikes = likes + (isLiked ? 1 : 0);
  const isBookmarked = bookmarks.some((item) => item.id === id);

  function handleBookmark() {
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((item) => item.id !== id));
    } else {
      setBookmarks([...bookmarks, post]);
    }
  }

  function handleLike() {
    if (isLiked) {
      setLikedPosts(likedPosts.filter((itemId) => itemId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  }

  function handleDelete() {
    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) {
      return;
    }

    setCustomPosts(customPosts.filter((item) => String(item.id) !== String(id)));
    setBookmarks(bookmarks.filter((item) => String(item.id) !== String(id)));
    toast.success("Post deleted successfully!");
  }

  const imageUrl = getPostImageUrl(post, { width: 600, height: 400 });

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <img
        src={imageUrl}
        alt={title}
        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="p-6">

        <div className="mb-4 flex items-center justify-between">

          <div className="flex flex-wrap gap-2">
            {(tags || []).slice(0, 2).map((tag) => (
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

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">

          <button
            onClick={handleLike}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              isLiked
                ? "bg-red-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            aria-pressed={isLiked}
          >
            <FiHeart />
            <span>{displayedLikes}</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {isCustom && (
              <>
                <button
                  onClick={() => navigate(`/blog/${id}?edit=1`)}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="rounded-full bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
                >
                  Delete
                </button>
              </>
            )}

            <Link
              to={`/blog/${id}`}
              className="flex items-center gap-2 font-semibold text-blue-600 transition hover:gap-3"
            >
              Read More
              <FiArrowRight />
            </Link>
          </div>

        </div>

      </div>
    </article>
  );
}

export default BlogCard;