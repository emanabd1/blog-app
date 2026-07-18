import { NavLink } from "react-router-dom";
import { FiSearch, FiBookmark } from "react-icons/fi";

function Navbar() {
  const active =
    "text-blue-600 font-semibold";

  const normal =
    "text-slate-600 hover:text-blue-600 transition";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}

        <NavLink
          to="/"
          className="text-2xl font-extrabold text-slate-900"
        >
          Blog<span className="text-blue-600">Space</span>
        </NavLink>

        {/* Navigation */}

        <nav className="hidden md:flex gap-8">

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

          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition">
            <FiSearch size={18} />
          </button>

          <button className="relative w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition">
            <FiBookmark size={18} />

            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>

          </button>

          <img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            className="w-11 h-11 rounded-full object-cover"
          />

        </div>

      </div>
    </header>
  );
}

export default Navbar;