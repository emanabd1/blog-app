function Loading({ cards = 4, detail = false }) {
  if (detail) {
    return (
      <div className="space-y-8 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="h-10 w-44 rounded-full bg-slate-200" />
          <div className="mt-8 h-80 rounded-3xl bg-slate-200" />
          <div className="mt-8 space-y-4">
            <div className="h-6 w-32 rounded-full bg-slate-200" />
            <div className="h-4 w-full rounded-full bg-slate-200" />
            <div className="h-4 w-full rounded-full bg-slate-200" />
            <div className="h-4 w-5/6 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 py-16 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: cards }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white p-6"
        >
          <div className="h-48 w-full rounded-3xl bg-slate-200" />
          <div className="mt-6 space-y-4">
            <div className="h-6 w-3/4 rounded-full bg-slate-200" />
            <div className="h-4 w-full rounded-full bg-slate-200" />
            <div className="h-4 w-full rounded-full bg-slate-200" />
            <div className="h-10 w-1/2 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loading;