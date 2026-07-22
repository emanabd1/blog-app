import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { getPosts } from "../services/api";
import { customPostsAtom } from "../atoms/postAtom";
import { searchAtom } from "../atoms/searchAtom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const [customPosts] = useAtom(customPostsAtom);
  const [searchTerm] = useAtom(searchAtom);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const allPosts = customPosts.concat(posts);
  const allTags = [];

  allPosts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    }
  });

  const filteredPosts = allPosts.filter((post) => {
    const query = searchTerm.trim().toLowerCase();
    const title = (post.title || "").toLowerCase();
    const body = (post.body || "").toLowerCase();
    const tags = (post.tags || []).join(" ").toLowerCase();

    const matchesTag = !selectedTag || (post.tags || []).includes(selectedTag);
    const matchesSearch = !query || title.includes(query) || body.includes(query) || tags.includes(query);

    return matchesTag && matchesSearch;
  });

  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Trending Posts</h2>
            <p className="mt-2 text-slate-500">
              Browse both fetched stories and your saved custom posts.
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            onClick={() => setSelectedTag(null)}
            variant={!selectedTag ? "primary" : "secondary"}
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              variant={selectedTag === tag ? "primary" : "secondary"}
            >
              {tag}
            </Button>
          ))}
        </div>

        {loading && <Loading cards={6} />}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && filteredPosts.length === 0 && (
          <p className="text-center text-slate-500">
            No posts matched your search or selected tags.
          </p>
        )}

        {!loading && !error && filteredPosts.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;