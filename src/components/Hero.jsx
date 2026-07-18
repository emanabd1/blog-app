import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        <div>

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            ✨ Welcome to BlogSpace
          </span>

          <h1 className="mt-6 text-6xl font-black leading-tight text-slate-900">
            Discover Stories,
            Ideas &
            Inspiration
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Explore articles from developers around the world.
            Read, learn, bookmark your favourites and grow your knowledge every day.
          </p>

          <div className="mt-10">

            <Link
              to="/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              Create Post
            </Link>

          </div>

        </div>

        <div>

          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900"
            alt=""
            className="rounded-3xl shadow-xl"
          />

        </div>

      </div>

    </section>
  );
}

export default Hero;