import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-6 py-20">
      <div className="max-w-2xl rounded-3xl bg-white p-12 text-center shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
          404 error
        </p>
        <h1 className="mt-6 text-5xl font-black text-slate-900">Page not found</h1>
        <p className="mt-6 text-slate-600 leading-8">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex rounded-full bg-blue-600 px-8 py-4 text-white transition hover:bg-blue-700"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
