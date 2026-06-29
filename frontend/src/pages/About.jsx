import { campusImages, getCampusImage } from "../utils/campusImages";
import { studentInfo } from "../config/studentInfo";
import Logo from "../components/Logo";

const architectureItems = [
  {
    title: "Frontend Layer",
    text: "React, Vite, Tailwind CSS, Axios, and React Router DOM provide a fast, responsive campus-facing interface."
  },
  {
    title: "API Layer",
    text: "Express routes separate club, event, RSVP, favourite, health, and statistics behaviour into clear REST endpoints."
  },
  {
    title: "Data Layer",
    text: "MongoDB and Mongoose store club and event documents with validation, timestamps, and query filters."
  }
];

const workflowItems = [
  "Students browse clubs by category and save favourites.",
  "Organizers create and update campus events.",
  "Students RSVP or cancel RSVP, with counts reflected immediately.",
  "The dashboard summarizes participation using live backend data."
];

function About() {
  const heroImage = getCampusImage(1) || getCampusImage(0);
  const galleryImages = campusImages.slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
        <div className="grid lg:grid-cols-[1fr_420px]">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-sm font-bold uppercase tracking-normal text-campus">
              Professional Project Overview
            </p>
            <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">UniClub Hub</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              UniClub Hub is an IU-level MERN stack application for DLBCSPJWD01 Project Java and Web Development. The project demonstrates a functional full-stack campus community platform where students can discover university clubs, browse upcoming events, RSVP to activities, and monitor simple engagement statistics.
            </p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              The application keeps authentication as a frontend demo flow while the core academic requirements stay focused on React frontend development, Express API design, MongoDB persistence, validation, routing, testing, and clear project documentation.
            </p>
            <div className="mt-5 grid gap-3 rounded-lg border border-line bg-slate-50 p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-normal text-campus">Student</p>
                <p className="mt-1 text-sm font-bold text-ink">{studentInfo.name}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-normal text-campus">Matriculation</p>
                <p className="mt-1 text-sm font-bold text-ink">{studentInfo.matriculation}</p>
              </div>
            </div>
          </div>
          <div className="min-h-[280px] bg-slate-100">
            {heroImage ? (
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                className="h-full min-h-[280px] w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[280px] items-center p-8">
                <p className="text-lg font-bold text-ink">
                  Add campus or club images to `frontend/src/assets` to display them here.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold text-ink">Purpose</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            The project solves a realistic university communication problem: club and event information is often scattered across informal channels. UniClub Hub centralizes that information in one clean browser application and makes participation visible through live dashboard metrics.
          </p>
        </article>
        <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold text-ink">Academic Scope</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            The implementation is intentionally realistic but manageable for a course project. It includes CRUD operations, dynamic statistics, responsive design, seed data, REST endpoints, Mongoose validation, and backend tests without overengineering the feature set.
          </p>
        </article>
      </section>

      <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-campus">Architecture</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">How the application is structured</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            React communicates with Express through Axios. Express controllers read and write MongoDB documents through Mongoose models.
          </p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {architectureItems.map((item) => (
            <article key={item.title} className="rounded-lg border border-line bg-slate-50 p-4">
              <h3 className="font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold text-ink">Core User Workflows</h2>
          <ul className="mt-4 space-y-3">
            {workflowItems.map((item) => (
              <li key={item} className="rounded-lg border border-line bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold text-ink">Evaluation Readiness</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm font-bold text-campus">Functional Requirements</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Clubs, events, favourites, RSVPs, filters, and dashboard statistics are connected to backend endpoints.
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-4">
              <p className="text-sm font-bold text-mint">Quality Requirements</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The project includes validation, error handling, loading states, seed data, tests, and documentation.
              </p>
            </div>
          </div>
        </article>
      </section>

      {galleryImages.length > 0 && (
        <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-campus">Campus Gallery</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">Visual assets used in the app</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image) => (
              <figure key={image.id} className="overflow-hidden rounded-lg border border-line bg-slate-50">
                <img src={image.src} alt={image.alt} className="h-40 w-full object-cover" />
                <figcaption className="px-3 py-2 text-sm font-semibold text-slate-600">
                  {image.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default About;
