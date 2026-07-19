import { useAtom } from "jotai";
import BlogCard from "../components/BlogCard";
import Button from "../components/Button"; // Helper component
import EmptyState from "../components/EmptyState"; // Helper component
import { bookmarksAtom } from "../atoms/bookmarkAtom";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter((item) => item.id !== id));
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900">My Bookmarks</h1>
      <p className="mt-2 text-slate-500">Your saved posts.</p>

      {bookmarks.length === 0 ? (
        <EmptyState 
          title="No Bookmarks" 
          description="Bookmark your favorite posts from the Home page." 
        />
      ) : (
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {bookmarks.map((post) => (
            <div key={post.id} className="flex flex-col gap-4">
              <BlogCard post={post} />
              <Button 
                onClick={() => removeBookmark(post.id)} 
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Remove Bookmark
              </Button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Bookmarks;