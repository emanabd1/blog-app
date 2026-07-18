function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-slate-500">
        © {new Date().getFullYear()} BlogSpace. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;