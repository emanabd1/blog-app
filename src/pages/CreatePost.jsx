import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { toast } from "sonner";

import BlogForm from "../components/BlogForm";
import { customPostsAtom } from "../atoms/postAtom";

function CreatePost() {
  const navigate = useNavigate();
  const [, setCustomPosts] = useAtom(customPostsAtom);

  function handleCreatePost(post) {
    setCustomPosts((currentPosts) => [post, ...currentPosts]);
    toast.success("Post created successfully!");
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