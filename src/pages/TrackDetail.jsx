import { Link, useParams } from "react-router-dom";
import { TRACKS } from "../data/tracks.js";

export default function TrackDetail() {
  const { code } = useParams();
  const t = TRACKS.find((tr) => tr.code === code);

  if (!t) {
    return (
      <div className="pt-28 pb-20 px-6 md:px-16 bg-ink min-h-screen text-[#DCE7E2]">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-sm text-[#86988F] mb-4">No track found for "{code}".</p>
          <Link to="/" className="font-mono text-sm text-flow hover:underline">
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 md:px-16 bg-ink min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link to="/" state={{ scrollTo: "tracks" }} className="font-mono text-xs text-[#86988F] hover:text-flow transition mb-8 inline-block">
          ← Back to all tracks
        </Link>
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-flow mb-3">
          {t.code} · {t.cadence}
        </div>
        <h1 className="font-display font-semibold text-4xl md:text-5xl mb-5 text-[#DCE7E2]">{t.name}</h1>
        <p className="font-body text-[#86988F] text-lg max-w-xl mb-10">{t.desc}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 mb-10">
          {[
            ["Next edition", t.next],
            ["Format", t.format],
            ["Submission", t.submission],
            ["Capacity", t.capacity],
            ["Location", t.location],
          ].map(([label, val]) => (
            <div key={label} className="bg-ink-raised p-6">
              <div className="font-mono text-xs uppercase tracking-[0.1em] text-[#86988F] mb-2">{label}</div>
              <div className="font-body text-sm text-[#DCE7E2]">{val}</div>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-[0.1em] text-[#86988F] mb-3">Past editions</div>
          <ul className="space-y-2">
            {t.past.map((p) => (
              <li key={p} className="font-body text-sm text-[#DCE7E2] border-t border-white/10 py-3">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/register"
          state={{ track: t.code }}
          className="inline-block font-mono text-sm px-6 py-3 bg-flow text-ink font-semibold rounded-sm hover:bg-[#DCE7E2] transition"
        >
          Register interest for {t.name} →
        </Link>
      </div>
    </div>
  );
}
