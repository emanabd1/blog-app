import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";

const posts = [
  {
    id: 1,
    title: "Understanding React Components",
    body: "Learn how React components help you build reusable and maintainable user interfaces.",
    likes: 124,
  },
  {
    id: 2,
    title: "Mastering React Router",
    body: "Navigate between pages in your React applications using React Router.",
    likes: 97,
  },
  {
    id: 3,
    title: "Getting Started with Tailwind CSS",
    body: "Build modern user interfaces faster using utility-first CSS classes.",
    likes: 145,
  },
  {
    id: 4,
    title: "Understanding useEffect",
    body: "Fetch data and synchronize your components using React's useEffect hook.",
    likes: 88,
  },
  {
    id: 5,
    title: "State Management with Jotai",
    body: "Learn how to manage global state using Jotai in a simple and scalable way.",
    likes: 112,
  },
  {
    id: 6,
    title: "Building Responsive Layouts",
    body: "Create layouts that look great on desktop, tablet, and mobile devices.",
    likes: 76,
  },
];

function Home() {
  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="mb-10 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Trending Posts
            </h2>

            <p className="mt-2 text-slate-500">
              Discover what people are reading today.
            </p>
          </div>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}
        </div>

      </section>
    </>
  );
}

export default Home;