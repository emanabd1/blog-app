import { FiHeart, FiBookmark, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function BlogCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <img
        src={`https://picsum.photos/600/400?random=${post.id}`}
        alt={post.title}
        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="p-6">

        <div className="mb-4 flex items-center justify-between">

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Technology
          </span>

          <button className="rounded-full p-2 transition hover:bg-slate-100">
            <FiBookmark size={18} />
          </button>

        </div>

        <h3 className="line-clamp-2 text-2xl font-bold text-slate-900">
          {post.title}
        </h3>

        <p className="mt-4 line-clamp-3 text-slate-600">
          {post.body}
        </p>

        <div className="mt-6 flex items-center justify-between">

          <div className="flex items-center gap-2 text-slate-500">
            <FiHeart />
            <span>{post.likes}</span>
          </div>

          <Link
            to={`/blog/${post.id}`}
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