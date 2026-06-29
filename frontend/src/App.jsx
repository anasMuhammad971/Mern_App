import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Clubs from "./pages/Clubs";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Routes are kept flat so the project is easy to review during IU evaluation. */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
