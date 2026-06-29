import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const storageKey = "uniclub-demo-user";

// This project uses local demo authentication for UI completeness, not production security.
function readStoredUser() {
  try {
    const storedUser = localStorage.getItem(storageKey);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
}

function persistUser(user) {
  localStorage.setItem(storageKey, JSON.stringify(user));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  function signup(payload) {
    const nextUser = {
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      studyProgram: payload.studyProgram.trim() || "Campus Member"
    };

    persistUser(nextUser);
    setUser(nextUser);
    return nextUser;
  }

  function login(payload) {
    const existingUser = readStoredUser();
    const email = payload.email.trim().toLowerCase();

    const nextUser =
      existingUser?.email === email
        ? existingUser
        : {
            name: email.split("@")[0] || "Campus Member",
            email,
            studyProgram: "Campus Member"
          };

    persistUser(nextUser);
    setUser(nextUser);
    return nextUser;
  }

  function logout() {
    localStorage.removeItem(storageKey);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signup,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
