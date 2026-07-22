function CommentCard({ comment }) {
  const { body, user } = comment || {};
  const username = user?.username || "anonymous";
  const fullName = user?.fullName || username;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={`https://i.pravatar.cc/150?u=${username}`}
          alt={username}
          className="h-12 w-12 rounded-full"
        />

        <div>
          <h4 className="font-semibold text-slate-900">
            {fullName}
          </h4>

          <p className="text-sm text-slate-500">
            @{username}
          </p>
        </div>
      </div>

      <p className="mt-4 leading-7 text-slate-600">
        {body || "No comment text provided."}
      </p>
    </div>
  );
}

export default CommentCard;