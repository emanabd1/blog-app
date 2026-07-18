import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";

import { getPosts } from "../services/api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Trending Posts
          </h2>

          <p className="mt-2 text-slate-500">
            Discover what developers are reading today.
          </p>
        </div>

        {loading && <Loading />}

        {error && (
          <p className="text-center text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        )}

      </section>
    </>
  );
}

export default Home;