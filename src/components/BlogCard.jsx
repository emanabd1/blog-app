import { FiHeart, FiBookmark, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function BlogCard({ post }) {
  const {
    id,
    title,
    body,
    reactions,
    tags,
  } = post;

  const likes =
    typeof reactions === "number"
      ? reactions
      : reactions?.likes ?? 0;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Blog Image */}
      <img
        src={`https://picsum.photos/seed/${id}/600/400`}
        alt={title}
        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="p-6">

        {/* Tag + Bookmark */}
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

          <button className="rounded-full p-2 transition hover:bg-slate-100">
            <FiBookmark size={18} />
          </button>

        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-2xl font-bold text-slate-900">
          {title}
        </h3>

        {/* Body */}
        <p className="mt-4 line-clamp-3 text-slate-600">
          {body}
        </p>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">

          <div className="flex items-center gap-2 text-slate-500">
            <FiHeart />
            <span>{likes}</span>
          </div>

          <Link
            to={`/blog/${id}`}
            className="flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 hover:gap-3"
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