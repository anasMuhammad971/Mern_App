import { useEffect, useState } from "react";
import { clubApi, eventApi, getApiErrorMessage, statsApi } from "../api/apiClient";
import ClubCard from "../components/ClubCard";
import EmptyState from "../components/EmptyState";
import EventCard from "../components/EventCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Logo from "../components/Logo";
import StudentBadge from "../components/StudentBadge";
import StatCard from "../components/StatCard";
import { getCampusImage } from "../utils/campusImages";

const emptyStats = {
  totalClubs: 0,
  totalEvents: 0,
  upcomingEvents: 0,
  totalRsvps: 0,
  favouriteClubs: 0,
  engagementPercentage: 0,
  summary: ""
};

function Dashboard() {
  const heroImage = getCampusImage(0);
  const [stats, setStats] = useState(emptyStats);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // The dashboard combines three API resources into one overview screen.
  async function loadDashboard() {
    setLoading(true);
    setError("");

    try {
      const [statsData, clubData, eventData] = await Promise.all([
        statsApi.get(),
        clubApi.list({ category: "all" }),
        eventApi.list({ status: "upcoming", type: "all" })
      ]);

      setStats(statsData);
      setClubs(clubData.filter((club) => club.isFavourite).slice(0, 3));
      setEvents(eventData.slice(0, 3));
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function refreshAfterAction() {
    await loadDashboard();
  }

  if (loading) {
    return <LoadingSpinner label="Loading campus dashboard" />;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-800">
          {error}
        </div>
      )}

      <section className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <Logo compact={false} />
                <StudentBadge compact />
              </div>
              <p className="mt-5 text-sm font-bold uppercase tracking-normal text-campus">
                DLBCSPJWD01 Campus Project
              </p>
              <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Discover clubs, join events, and build your campus story.
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                UniClub Hub connects students with communities, upcoming activities, and simple participation insights.
              </p>
            </div>
            <div className="border-t border-line bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-500">Engagement summary</p>
              <p className="mt-3 text-4xl font-bold text-campus">{stats.engagementPercentage}%</p>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-mint transition-all"
                  style={{ width: `${stats.engagementPercentage}%` }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{stats.summary}</p>
            </div>
          </div>
          <div className="min-h-[260px] bg-slate-100">
            {heroImage ? (
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                className="h-full min-h-[260px] w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[260px] flex-col justify-center p-8">
                <p className="text-sm font-bold uppercase tracking-normal text-campus">
                  Campus Visuals
                </p>
                <p className="mt-3 text-2xl font-bold text-ink">
                  Add images to `frontend/src/assets` to personalize this hero area.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total clubs" value={stats.totalClubs} symbol="C" accent="blue" />
        <StatCard label="Total events" value={stats.totalEvents} symbol="E" accent="green" />
        <StatCard label="Upcoming" value={stats.upcomingEvents} symbol="U" accent="amber" />
        <StatCard label="Total RSVPs" value={stats.totalRsvps} symbol="R" accent="coral" />
        <StatCard label="Favourites" value={stats.favouriteClubs} symbol="F" accent="rose" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-ink">Favourite Clubs</h2>
          {clubs.length === 0 ? (
            <EmptyState title="No favourite clubs yet" message="Mark clubs as favourites to see them here." />
          ) : (
            <div className="space-y-3">
              {clubs.map((club) => (
                <ClubCard
                  key={club._id}
                  club={club}
                  onFavourite={async () => {
                    await clubApi.favourite(club._id);
                    await refreshAfterAction();
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-ink">Next Events</h2>
          {events.length === 0 ? (
            <EmptyState title="No upcoming events" message="Create an event to start filling the campus calendar." />
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onRsvp={async () => {
                    await eventApi.rsvp(event._id);
                    await refreshAfterAction();
                  }}
                  onCancelRsvp={async () => {
                    await eventApi.cancelRsvp(event._id);
                    await refreshAfterAction();
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
