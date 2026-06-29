import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { studentInfo } from "../config/studentInfo";
import Logo from "./Logo";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/clubs", label: "Clubs" },
  { to: "/events", label: "Events" },
  { to: "/about", label: "About" }
];

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b border-line bg-white">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <Logo compact showText={false} />
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-ink">UniClub Hub</p>
            <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">
              {studentInfo.name} | {studentInfo.matriculation}
            </p>
          </div>
        </NavLink>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-campus text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-line pt-3 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 rounded-lg border border-line bg-slate-50 px-3 py-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-xs font-bold text-white">
                    {user.name.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="max-w-[140px] truncate text-sm font-bold text-ink">{user.name}</p>
                    <p className="max-w-[140px] truncate text-xs text-slate-500">{user.studyProgram}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg border border-line px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "border-campus bg-blue-50 text-campus"
                        : "border-line text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-semibold text-white transition ${
                      isActive ? "bg-ink" : "bg-campus hover:bg-blue-700"
                    }`
                  }
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
