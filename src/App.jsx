import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreatePost from "./pages/CreatePost";
import Bookmarks from "./pages/Bookmarks";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;