import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiHeart } from "react-icons/fi";

import Loading from "../components/Loading";
import CommentCard from "../components/CommentCard";

import { getPost, getComments } from "../services/api";

function BlogDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const postData = await getPost(id);
        const commentsData = await getComments(id);

        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">

      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        <FiArrowLeft />
        Back to Posts
      </Link>

      <img
        src={`https://picsum.photos/seed/${id}/1200/500`}
        alt={post.title}
        className="mt-8 h-96 w-full rounded-3xl object-cover"
      />

      <div className="mt-10">

        <h1 className="text-5xl font-black text-slate-900">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-slate-500">
          <FiHeart />

          <span>
            {typeof post.reactions === "number"
              ? post.reactions
              : post.reactions?.likes ?? 0}
          </span>
        </div>

        <p className="mt-8 text-lg leading-9 text-slate-700">
          {post.body}
        </p>

      </div>

      <div className="mt-20">

        <h2 className="mb-8 text-3xl font-bold">
          Comments ({comments.length})
        </h2>

        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>

      </div>

    </section>
  );
}

export default BlogDetails;