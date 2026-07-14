import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const goToSection = (section) => {
    setOpen(false);
    navigate("/", { state: { scrollTo: section } });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur bg-ink/90 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-[#DCE7E2]">
          <span className="w-2 h-2 rounded-full bg-flow shadow-[0_0_8px_#1FCBB2]" />
          Stream <span className="text-[#86988F] font-normal text-sm ml-1 font-mono">/ conferences</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-sm text-[#86988F]">
          <button onClick={() => goToSection("tracks")} className="hover:text-[#DCE7E2] transition">
            Tracks
          </button>
          <button onClick={() => goToSection("schedule")} className="hover:text-[#DCE7E2] transition">
            Schedule
          </button>
          <Link to="/venue" className="hover:text-[#DCE7E2] transition">
            About &amp; venues
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-flow text-ink font-semibold rounded-sm hover:bg-[#DCE7E2] transition"
          >
            Register interest
          </Link>
        </nav>

        <button className="md:hidden text-[#DCE7E2]" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <div className="w-6 h-0.5 bg-current mb-1.5" />
          <div className="w-6 h-0.5 bg-current" />
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-1 px-6 pb-4 font-mono text-sm text-[#86988F]">
          <button onClick={() => goToSection("tracks")} className="py-2 text-left">
            Tracks
          </button>
          <button onClick={() => goToSection("schedule")} className="py-2 text-left">
            Schedule
          </button>
          <Link to="/venue" onClick={() => setOpen(false)} className="py-2 text-left">
            About &amp; venues
          </Link>
          <Link to="/register" onClick={() => setOpen(false)} className="py-2 text-left text-flow">
            Register interest
          </Link>
        </div>
      )}
    </header>
  );
}
