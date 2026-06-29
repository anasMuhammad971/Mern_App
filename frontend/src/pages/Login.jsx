import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { getCampusImage } from "../utils/campusImages";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const heroImage = getCampusImage(2) || getCampusImage(0);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  // Demo validation gives a realistic login flow without storing real passwords.
  function handleSubmit(event) {
    event.preventDefault();

    if (!form.email.includes("@")) {
      setError("Enter a valid university email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters for this demo.");
      return;
    }

    login(form);
    navigate("/");
  }

  return (
    <section className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
      <div className="grid min-h-[680px] lg:grid-cols-[1fr_0.95fr]">
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <div className="max-w-md">
            <div className="mb-8">
              <Logo />
            </div>
            <p className="text-sm font-bold uppercase tracking-normal text-campus">
              Welcome back
            </p>
            <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
              Sign in to your campus community.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Continue managing clubs, events, favourites, and RSVPs from a polished UniClub Hub workspace.
            </p>

            {error && (
              <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-800">
                {error}
              </div>
            )}

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-semibold text-slate-700" htmlFor="login-email">
                  Email address
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
                  placeholder="student@iu-study.org"
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="login-password">
                    Password
                  </label>
                  <span className="text-xs font-semibold text-campus">Demo access</span>
                </div>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={updateField}
                  className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-blue-100"
                  placeholder="Minimum 6 characters"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-campus px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-600">
              New to UniClub Hub?{" "}
              <Link to="/signup" className="font-bold text-campus hover:text-blue-700">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        <div className="relative hidden bg-slate-100 lg:block">
          {heroImage && (
            <img src={heroImage.src} alt={heroImage.alt} className="h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-normal text-blue-100">
              Premium campus access
            </p>
            <p className="mt-2 text-3xl font-bold">
              One place for clubs, events, and participation insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
