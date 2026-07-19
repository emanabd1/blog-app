import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";
import Button from "../components/Button"; // Helper component
import { getPosts } from "../services/api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

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

  // Extract unique tags
  const allTags = [...new Set(posts.flatMap((p) => p.tags))];

  // Filter posts
  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Trending Posts</h2>
          
          {/* Tag Filter Buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
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
        </div>

        {loading && <Loading />}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!loading && !error && (
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