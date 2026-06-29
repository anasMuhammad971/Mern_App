import { useEffect, useMemo, useState } from "react";
import { eventApi, getApiErrorMessage } from "../api/apiClient";
import EmptyState from "../components/EmptyState";
import EventCard from "../components/EventCard";
import LoadingSpinner from "../components/LoadingSpinner";

const initialForm = {
  title: "",
  clubName: "",
  type: "Workshop",
  date: "",
  location: "",
  capacity: 30,
  description: ""
};

const defaultTypes = ["Workshop", "Social", "Academic", "Sports", "Culture", "Volunteering"];

function formatInputDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function Events() {
  const [events, setEvents] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("upcoming");
  const [form, setForm] = useState(initialForm);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const eventTypes = useMemo(() => {
    const fromEvents = events.map((event) => event.type);
    return Array.from(new Set([...defaultTypes, ...fromEvents])).sort();
  }, [events]);

  // Event filters are sent to the backend so the API remains the source of truth.
  async function loadEvents(nextType = typeFilter, nextStatus = statusFilter) {
    setLoading(true);
    setError("");

    try {
      const data = await eventApi.list({ type: nextType, status: nextStatus });
      setEvents(data);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents(typeFilter, statusFilter);
  }, [typeFilter, statusFilter]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEditing(eventItem) {
    setEditingEvent(eventItem);
    setForm({
      title: eventItem.title,
      clubName: eventItem.clubName,
      type: eventItem.type,
      date: formatInputDate(eventItem.date),
      location: eventItem.location,
      capacity: eventItem.capacity,
      description: eventItem.description || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingEvent(null);
    setForm(initialForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    const payload = {
      ...form,
      capacity: Number(form.capacity)
    };

    try {
      // The same form supports both event creation and editing.
      if (editingEvent) {
        await eventApi.update(editingEvent._id, payload);
        setNotice("Event updated.");
      } else {
        await eventApi.create(payload);
        setNotice("Event created.");
      }

      resetForm();
      await loadEvents(typeFilter, statusFilter);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(eventItem) {
    if (!window.confirm(`Delete ${eventItem.title}?`)) {
      return;
    }

    setError("");
    setNotice("");

    try {
      await eventApi.remove(eventItem._id);
      setNotice("Event deleted.");
      await loadEvents(typeFilter, statusFilter);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    }
  }

  async function handleRsvp(eventItem) {
    setError("");
    setNotice("");

    try {
      await eventApi.rsvp(eventItem._id);
      setNotice("RSVP saved.");
      await loadEvents(typeFilter, statusFilter);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    }
  }

  async function handleCancelRsvp(eventItem) {
    setError("");
    setNotice("");

    try {
      await eventApi.cancelRsvp(eventItem._id);
      setNotice("RSVP cancelled.");
      await loadEvents(typeFilter, statusFilter);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
      <section className="rounded-lg border border-line bg-white p-4 shadow-soft lg:sticky lg:top-6 lg:self-start">
        <h1 className="text-2xl font-bold text-ink">{editingEvent ? "Edit Event" : "Create Event"}</h1>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="event-title">
              Event title
            </label>
            <input
              id="event-title"
              name="title"
              value={form.title}
              onChange={updateField}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
              placeholder="Hack Night"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="event-club">
              Club name
            </label>
            <input
              id="event-club"
              name="clubName"
              value={form.clubName}
              onChange={updateField}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
              placeholder="Code Collective"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="event-type">
                Type
              </label>
              <select
                id="event-type"
                name="type"
                value={form.type}
                onChange={updateField}
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
              >
                {defaultTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="event-date">
                Date
              </label>
              <input
                id="event-date"
                name="date"
                type="date"
                value={form.date}
                onChange={updateField}
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="event-location">
                Location
              </label>
              <input
                id="event-location"
                name="location"
                value={form.location}
                onChange={updateField}
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
                placeholder="Innovation Lab"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="event-capacity">
                Capacity
              </label>
              <input
                id="event-capacity"
                name="capacity"
                type="number"
                min="1"
                value={form.capacity}
                onChange={updateField}
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="event-description">
              Description
            </label>
            <textarea
              id="event-description"
              name="description"
              value={form.description}
              onChange={updateField}
              rows="3"
              className="mt-1 w-full resize-none rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
              placeholder="What should students expect?"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-campus px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {saving ? "Saving..." : editingEvent ? "Save event" : "Add event"}
            </button>
            {editingEvent && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-line px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-ink">Campus Events</h2>
              <p className="text-sm text-slate-500">Plan, join, and manage student activities.</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[360px]">
              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
                aria-label="Filter events by type"
              >
                <option value="all">All types</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
                aria-label="Filter events by date status"
              >
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
                <option value="all">All dates</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-800">
            {error}
          </div>
        )}
        {notice && !error && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
            {notice}
          </div>
        )}

        {loading ? (
          <LoadingSpinner label="Loading events" />
        ) : events.length === 0 ? (
          <EmptyState title="No events found" message="Create an event or change the selected filters." />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {events.map((eventItem) => (
              <EventCard
                key={eventItem._id}
                event={eventItem}
                onEdit={startEditing}
                onDelete={handleDelete}
                onRsvp={handleRsvp}
                onCancelRsvp={handleCancelRsvp}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Events;
