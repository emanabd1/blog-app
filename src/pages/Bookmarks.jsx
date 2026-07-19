import { useAtom } from "jotai";

import BlogCard from "../components/BlogCard";
import { bookmarksAtom } from "../atoms/bookmarkAtom";

function Bookmarks() {
  const [bookmarks] = useAtom(bookmarksAtom);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold text-slate-900">
        My Bookmarks
      </h1>

      <p className="mt-2 text-slate-500">
        Your saved posts.
      </p>

      {bookmarks.length === 0 ? (
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold text-slate-600">
            No bookmarked posts yet.
          </h2>

          <p className="mt-3 text-slate-500">
            Bookmark your favorite posts from the Home page.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {bookmarks.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      )}

    </section>
  );
}

export default Bookmarks;