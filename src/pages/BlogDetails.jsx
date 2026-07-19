import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import {
  FiArrowLeft,
  FiHeart,
  FiBookmark,
} from "react-icons/fi";

import Loading from "../components/Loading";
import CommentCard from "../components/CommentCard";
import {
  getPost,
  getComments,
} from "../services/api";
import { bookmarksAtom } from "../atoms/bookmarkAtom";

function BlogDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  const likes =
    typeof post.reactions === "number"
      ? post.reactions
      : post.reactions?.likes ?? 0;

  const isBookmarked = bookmarks.some(
    (item) => item.id === post.id
  );

  function handleBookmark() {
    if (isBookmarked) {
      setBookmarks(
        bookmarks.filter((item) => item.id !== post.id)
      );
    } else {
      setBookmarks([...bookmarks, post]);
    }
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
          <span>{likes}</span>
        </div>

        <button
          onClick={handleBookmark}
          className={`mt-6 flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition ${
            isBookmarked
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <FiBookmark />
          {isBookmarked ? "Bookmarked" : "Add Bookmark"}
        </button>

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