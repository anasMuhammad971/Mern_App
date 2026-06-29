function ClubCard({ club, onEdit, onDelete, onFavourite }) {
  return (
    <article className="rounded-lg border border-line bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-words text-lg font-bold text-ink">{club.name}</h3>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-campus">
              {club.category}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{club.description}</p>
        </div>
        <button
          type="button"
          onClick={() => onFavourite(club)}
          className={`h-10 w-10 rounded-lg border text-lg transition ${
            club.isFavourite
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : "border-line text-slate-500 hover:bg-slate-50"
          }`}
          title={club.isFavourite ? "Remove favourite" : "Mark favourite"}
        >
          <span aria-hidden="true">{club.isFavourite ? "♥" : "♡"}</span>
          <span className="sr-only">{club.isFavourite ? "Remove favourite" : "Mark favourite"}</span>
        </button>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-3">
          <dt className="font-semibold text-slate-500">Meeting</dt>
          <dd className="mt-1 text-ink">{club.meetingDay || "Flexible"}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <dt className="font-semibold text-slate-500">Location</dt>
          <dd className="mt-1 text-ink">{club.location || "Campus"}</dd>
        </div>
      </dl>

      {(onEdit || onDelete) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(club)}
              className="rounded-lg border border-line px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(club)}
              className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default ClubCard;
