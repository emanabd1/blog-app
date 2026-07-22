function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-20 py-8 text-slate-600">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center">
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-700">
          <a href="#about" className="transition hover:text-slate-900">
            About
          </a>
          <a href="https://github.com/emanabd1" target="_blank" rel="noreferrer" className="transition hover:text-slate-900">
            GitHub
          </a>
          <a href="mailto:emanabdulsemed4398@gmail.com" className="transition hover:text-slate-900">
            Contact
          </a>
        </div>

        <div className="space-y-1 text-sm text-slate-500">
          <p>Built by Eman Abdulsemed</p>
         
        </div>

        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
          © {new Date().getFullYear()} BlogSpace
        </p>
      </div>
    </footer>
  );
}

export default Footer;