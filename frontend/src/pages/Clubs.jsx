import { useEffect, useMemo, useState } from "react";
import { clubApi, getApiErrorMessage } from "../api/apiClient";
import ClubCard from "../components/ClubCard";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

const initialForm = {
  name: "",
  category: "Technology",
  description: "",
  meetingDay: "",
  location: "",
  isFavourite: false
};

const defaultCategories = ["Technology", "Culture", "Academic", "Sports", "Arts", "Volunteering"];

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [form, setForm] = useState(initialForm);
  const [editingClub, setEditingClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const categories = useMemo(() => {
    const fromClubs = clubs.map((club) => club.category);
    return Array.from(new Set([...defaultCategories, ...fromClubs])).sort();
  }, [clubs]);

  // Reload clubs whenever the selected category changes.
  async function loadClubs(nextCategory = categoryFilter) {
    setLoading(true);
    setError("");

    try {
      const data = await clubApi.list({ category: nextCategory });
      setClubs(data);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClubs(categoryFilter);
  }, [categoryFilter]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  function startEditing(club) {
    setEditingClub(club);
    setForm({
      name: club.name,
      category: club.category,
      description: club.description,
      meetingDay: club.meetingDay || "",
      location: club.location || "",
      isFavourite: club.isFavourite
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingClub(null);
    setForm(initialForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      // The same form supports both create and edit to keep the UI simple for review.
      if (editingClub) {
        await clubApi.update(editingClub._id, form);
        setNotice("Club updated.");
      } else {
        await clubApi.create(form);
        setNotice("Club created.");
      }

      resetForm();
      await loadClubs(categoryFilter);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(club) {
    if (!window.confirm(`Delete ${club.name}?`)) {
      return;
    }

    setError("");
    setNotice("");

    try {
      await clubApi.remove(club._id);
      setNotice("Club deleted.");
      await loadClubs(categoryFilter);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    }
  }

  async function handleFavourite(club) {
    setError("");
    setNotice("");

    try {
      await clubApi.favourite(club._id);
      setNotice(club.isFavourite ? "Favourite removed." : "Club added to favourites.");
      await loadClubs(categoryFilter);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
      <section className="rounded-lg border border-line bg-white p-4 shadow-soft lg:sticky lg:top-6 lg:self-start">
        <h1 className="text-2xl font-bold text-ink">{editingClub ? "Edit Club" : "Create Club"}</h1>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="club-name">
              Club name
            </label>
            <input
              id="club-name"
              name="name"
              value={form.name}
              onChange={updateField}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
              placeholder="Code Collective"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="club-category">
              Category
            </label>
            <select
              id="club-category"
              name="category"
              value={form.category}
              onChange={updateField}
              className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
            >
              {defaultCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="club-description">
              Description
            </label>
            <textarea
              id="club-description"
              name="description"
              value={form.description}
              onChange={updateField}
              rows="4"
              className="mt-1 w-full resize-none rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
              placeholder="What does this club offer students?"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="meeting-day">
                Meeting day
              </label>
              <input
                id="meeting-day"
                name="meetingDay"
                value={form.meetingDay}
                onChange={updateField}
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
                placeholder="Tuesday"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="club-location">
                Location
              </label>
              <input
                id="club-location"
                name="location"
                value={form.location}
                onChange={updateField}
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
                placeholder="Innovation Lab"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-lg border border-line p-3 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              name="isFavourite"
              checked={form.isFavourite}
              onChange={updateField}
              className="h-4 w-4"
            />
            Favourite club
          </label>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-campus px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {saving ? "Saving..." : editingClub ? "Save club" : "Add club"}
            </button>
            {editingClub && (
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-ink">Campus Clubs</h2>
              <p className="text-sm text-slate-500">Browse communities by academic and social interests.</p>
            </div>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
              aria-label="Filter clubs by category"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
          <LoadingSpinner label="Loading clubs" />
        ) : clubs.length === 0 ? (
          <EmptyState title="No clubs found" message="Create a club or change the selected category." />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {clubs.map((club) => (
              <ClubCard
                key={club._id}
                club={club}
                onEdit={startEditing}
                onDelete={handleDelete}
                onFavourite={handleFavourite}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Clubs;
