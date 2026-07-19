import { useState } from "react";
import { FiUpload } from "react-icons/fi"; 

function BlogForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    onSubmit({
      id: Date.now(),
      title,
      body,
      image: preview,
      tags: ["custom"],
      reactions: 0,
    });

    setTitle("");
    setBody("");
    setImage(null);
    setPreview("");
    setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-md"
    >
      <h2 className="mb-8 text-3xl font-bold text-slate-900">
        Create New Post
      </h2>

      {error && (
        <div className="mb-6 rounded-xl bg-red-100 p-4 text-red-600">
          {error}
        </div>
      )}

      {}
      <div className="mb-6">
        <label className="mb-2 block font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
        />
      </div>

      {}
      <div className="mb-6">
        <label className="mb-2 block font-medium">Body</label>
        <textarea
          rows="7"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
        />
      </div>

      {}
      <div className="mb-10">
        <label className="mb-3 block font-medium text-slate-900">
          Cover Image
        </label>

        <div className="relative">
          <label
            htmlFor="imageUpload"
            className="flex h-72 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-600 hover:bg-blue-50"
          >
            {preview ? (
              <div className="h-full w-full overflow-hidden rounded-[1.25rem] p-2">
                <img
                  src={preview}
                  alt="preview"
                  className="h-full w-full rounded-[1rem] object-cover shadow-inner"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-center text-slate-500">
                <div className="rounded-full bg-white p-3 shadow-sm">
                  <FiUpload className="h-8 w-8 text-blue-600" />
                </div>
                <span className="font-medium">Click to upload cover image</span>
                <span className="text-sm">or drag & drop (PNG, JPG)</span>
              </div>
            )}
          </label>

          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {preview && (
            <button
              type="button"
              onClick={() => {
                setPreview("");
                setImage(null);
              }}
              className="absolute right-5 top-5 rounded-full bg-white/90 p-2 text-slate-600 shadow-md backdrop-blur-sm transition hover:bg-white hover:text-red-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Publish Post
      </button>
    </form>
  );
}

export default BlogForm;