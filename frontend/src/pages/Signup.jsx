import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { getCampusImage } from "../utils/campusImages";

const initialForm = {
  name: "",
  email: "",
  studyProgram: "",
  password: "",
  confirmPassword: ""
};

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const heroImage = getCampusImage(3) || getCampusImage(0);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  // The signup flow creates a local demo profile used by the navbar and footer.
  function handleSubmit(event) {
    event.preventDefault();

    if (form.name.trim().length < 2) {
      setError("Enter your full name.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Enter a valid university email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    signup(form);
    navigate("/");
  }

  return (
    <section className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
      <div className="grid min-h-[720px] lg:grid-cols-[0.95fr_1fr]">
        <div className="relative hidden bg-slate-100 lg:block">
          {heroImage && (
            <img src={heroImage.src} alt={heroImage.alt} className="h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-campus/80 via-ink/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-normal text-blue-100">
              Join the hub
            </p>
            <p className="mt-2 text-3xl font-bold">
              Build your student profile around clubs, events, and campus participation.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <div className="max-w-lg">
            <div className="mb-8">
              <Logo />
            </div>
            <p className="text-sm font-bold uppercase tracking-normal text-campus">
              Create account
            </p>
            <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
              Start your UniClub Hub profile.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use this demo signup to personalize the navbar and present a complete premium access flow.
            </p>

            {error && (
              <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-800">
                {error}
              </div>
            )}

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700" htmlFor="signup-name">
                    Full name
                  </label>
                  <input
                    id="signup-name"
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    className="mt-1 w-full rounded-lg border border-line px-4 py-3 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
                    placeholder="Sahil Khan"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700" htmlFor="study-program">
                    Study program
                  </label>
                  <input
                    id="study-program"
                    name="studyProgram"
                    value={form.studyProgram}
                    onChange={updateField}
                    className="mt-1 w-full rounded-lg border border-line px-4 py-3 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
                    placeholder="B.Sc. Computer Science"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700" htmlFor="signup-email">
                  Email address
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  className="mt-1 w-full rounded-lg border border-line px-4 py-3 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
                  placeholder="student@iu-study.org"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700" htmlFor="signup-password">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={updateField}
                    className="mt-1 w-full rounded-lg border border-line px-4 py-3 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
                    placeholder="Minimum 6 characters"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700" htmlFor="confirm-password">
                    Confirm password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={updateField}
                    className="mt-1 w-full rounded-lg border border-line px-4 py-3 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
                    placeholder="Repeat password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-campus px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-campus hover:text-blue-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
