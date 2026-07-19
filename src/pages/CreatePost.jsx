import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

import BlogForm from "../components/BlogForm";
import { customPostsAtom } from "../atoms/postAtom";

function CreatePost() {
  const navigate = useNavigate();

  const [, setPosts] = useAtom(customPostsAtom);

  function handleCreatePost(post) {
    setPosts((prev) => [post, ...prev]);

    alert("Post created successfully!");

    navigate("/");
  }

  return (
    <section className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-5xl px-6">
        <BlogForm onSubmit={handleCreatePost} />
      </div>
    </section>
  );
}

export default CreatePost;