function EmptyState({ title, description }) {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-slate-700">{title}</h2>
      <p className="text-slate-500 mt-2">{description}</p>
    </div>
  );
}
export default EmptyState;