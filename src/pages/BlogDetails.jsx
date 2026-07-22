import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { FiArrowLeft, FiHeart, FiBookmark } from "react-icons/fi";

import Loading from "../components/Loading";
import CommentCard from "../components/CommentCard";
import { getPost, getComments } from "../services/api";
import { bookmarksAtom } from "../atoms/bookmarkAtom";
import { customPostsAtom } from "../atoms/postAtom";
import { likedPostsAtom } from "../atoms/likesAtom";
import { getPostImageUrl } from "../utils/postImage";

function BlogDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [editedTags, setEditedTags] = useState("");

  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);
  const [customPosts, setCustomPosts] = useAtom(customPostsAtom);
  const [likedPosts, setLikedPosts] = useAtom(likedPostsAtom);

  const customPost = customPosts.find((item) => String(item.id) === String(id));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const shouldEdit = params.get("edit") === "1";

    if (customPost) {
      setPost(customPost);
      setComments([]);
      setLoading(false);
      setError("");
      setEditedTitle(customPost.title);
      setEditedBody(customPost.body);
      setEditedTags((customPost.tags || []).join(", "));
      setEditMode(shouldEdit);
      return;
    }

    setEditMode(false);

    async function loadData() {
      setLoading(true);
      setError("");
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
  }, [id, customPost, location.search]);

  if (loading) {
    return <Loading detail />;
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  const likes = typeof post.reactions === "number" ? post.reactions : post.reactions?.likes ?? 0;
  const isLiked = likedPosts.includes(post.id);
  const displayedLikes = likes + (isLiked ? 1 : 0);

  const isBookmarked = bookmarks.some(
    (item) => item.id === post.id
  );

  const isCustomPost = Boolean(customPost);

  function handleBookmark() {
    if (isBookmarked) {
      setBookmarks(
        bookmarks.filter((item) => item.id !== post.id)
      );
    } else {
      setBookmarks([...bookmarks, post]);
    }
  }

  function handleLike() {
    if (isLiked) {
      setLikedPosts(likedPosts.filter((itemId) => itemId !== post.id));
    } else {
      setLikedPosts([...likedPosts, post.id]);
    }
  }

  function handleSaveEdit() {
    const updatedPost = {
      ...post,
      title: editedTitle.trim() || post.title,
      body: editedBody.trim() || post.body,
      tags: editedTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    setCustomPosts((current) =>
      current.map((item) =>
        String(item.id) === String(post.id) ? updatedPost : item
      )
    );
    setPost(updatedPost);
    setEditMode(false);
  }

  function handleDelete() {
    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) {
      return;
    }

    setCustomPosts((current) =>
      current.filter((item) => String(item.id) !== String(post.id))
    );
    setBookmarks((current) =>
      current.filter((item) => String(item.id) !== String(post.id))
    );
    toast.success("Post deleted successfully!");
    navigate("/");
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
        src={getPostImageUrl(post, { width: 1200, height: 700 })}
        alt={post.title}
        className="mt-8 h-96 w-full rounded-3xl object-cover"
      />

      <div className="mt-10">

        {editMode ? (
          <div className="space-y-6 rounded-3xl border border-slate-300 bg-slate-50 p-8 shadow-sm">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-slate-900">
                Edit Your Post
              </h2>
              <p className="mb-6 text-slate-600">
                Change the title, body, or tags and click Save Changes.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Title
              </label>
              <input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Body
              </label>
              <textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                rows={8}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tags
              </label>
              <input
                value={editedTags}
                onChange={(e) => setEditedTags(e.target.value)}
                placeholder="comma, separated, tags"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSaveEdit}
                className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="rounded-xl border border-slate-300 px-6 py-3 text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-5xl font-black text-slate-900">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">
              {(post.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition ${
                  isLiked
                    ? "bg-red-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                aria-pressed={isLiked}
              >
                <FiHeart />
                {isLiked ? "Unlike" : "Like"}
                <span>{displayedLikes}</span>
              </button>

              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition ${
                  isBookmarked
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <FiBookmark />
                {isBookmarked ? "Bookmarked" : "Add Bookmark"}
              </button>

              {isCustomPost && (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    className="rounded-xl border border-slate-300 px-5 py-3 text-slate-700 transition hover:bg-slate-100"
                  >
                    Edit Post
                  </button>
                  <button
                    onClick={handleDelete}
                    className="rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"
                  >
                    Delete Post
                  </button>
                </>
              )}
            </div>

            <p className="mt-8 text-lg leading-9 text-slate-700">
              {post.body}
            </p>
          </>
        )}

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