function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

function EventCard({ event, onEdit, onDelete, onRsvp, onCancelRsvp }) {
  const capacityPercent =
    event.capacity === 0 ? 0 : Math.min(100, Math.round((event.rsvpCount / event.capacity) * 100));

  return (
    <article className="rounded-lg border border-line bg-white p-4 shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-words text-lg font-bold text-ink">{event.title}</h3>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-mint">
              {event.type}
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold text-slate-500">{event.clubName}</p>
          {event.description && (
            <p className="mt-2 text-sm leading-6 text-slate-600">{event.description}</p>
          )}
        </div>
        <div className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-campus">
          {formatDate(event.date)}
        </div>
      </div>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="font-semibold text-slate-500">Location</p>
          <p className="mt-1 text-ink">{event.location}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="font-semibold text-slate-500">RSVPs</p>
          <p className="mt-1 text-ink">
            {event.rsvpCount} / {event.capacity}
          </p>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-mint" style={{ width: `${capacityPercent}%` }} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onRsvp(event)}
          disabled={event.rsvpCount >= event.capacity}
          className="rounded-lg bg-campus px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          RSVP
        </button>
        <button
          type="button"
          onClick={() => onCancelRsvp(event)}
          disabled={event.rsvpCount <= 0}
          className="rounded-lg border border-line px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
        >
          Cancel RSVP
        </button>
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(event)}
            className="rounded-lg border border-line px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(event)}
            className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}

export default EventCard;
