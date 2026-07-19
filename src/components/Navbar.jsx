import { NavLink, Link } from "react-router-dom";
import { useAtom } from "jotai";
import { FiSearch, FiBookmark } from "react-icons/fi";
import { bookmarksAtom } from "../atoms/bookmarkAtom";

function Navbar() {
  const [bookmarks] = useAtom(bookmarksAtom);

  const active =
    "text-blue-600 font-semibold";

  const normal =
    "text-slate-600 hover:text-blue-600 transition";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-slate-900"
        >
          Blog<span className="text-blue-600">Space</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? active : normal
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? active : normal
            }
          >
            Create Post
          </NavLink>

          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              isActive ? active : normal
            }
          >
            Bookmarks
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-100">
            <FiSearch size={18} />
          </button>

          <Link
            to="/bookmarks"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-100"
          >
            <FiBookmark size={18} />

            {bookmarks.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {bookmarks.length}
              </span>
            )}
          </Link>

          <img
            src="https://i.pravatar.cc/100"
            alt="User Avatar"
            className="h-11 w-11 rounded-full object-cover"
          />
        </div>

      </div>
    </header>
  );
}

export default Navbar;