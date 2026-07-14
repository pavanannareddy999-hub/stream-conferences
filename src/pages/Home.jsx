import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Scene3D from "../components/Scene3D.jsx";
import { TRACKS } from "../data/tracks.js";

export default function Home() {
  const mount = useRef(null);
  const tracksRef = useRef(null);
  const scheduleRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target === "tracks" && tracksRef.current) {
      tracksRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (target === "schedule" && scheduleRef.current) {
      scheduleRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // clear the state so re-visiting "/" via back button doesn't re-scroll
    if (target) navigate(".", { replace: true, state: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return (
    <>
      <section className="relative h-screen min-h-[640px] overflow-hidden border-b border-white/10">
        <div ref={mount} className="absolute inset-0 z-0" />
        <Scene3D mount={mount} />
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-16 pointer-events-none">
          <div className="max-w-2xl pointer-events-auto">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-flow mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-flow rounded-full" /> Four events · one current
            </div>
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] mb-5 text-[#DCE7E2]">
              Conferences that move
              <br />
              with the field.
            </h1>
            <p className="font-body text-[#86988F] text-lg max-w-md mb-8">
              Stream runs a small, deliberate network of recurring events — no bloated
              annual mega-conference, just the right room at the right moment.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => tracksRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="font-mono text-sm px-6 py-3 bg-flow text-ink font-semibold rounded-sm hover:bg-[#DCE7E2] transition"
              >
                See the tracks →
              </button>
              <button
                onClick={() => scheduleRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="font-mono text-sm px-6 py-3 border border-[#DCE7E2]/40 rounded-sm hover:border-[#DCE7E2] transition text-[#DCE7E2]"
              >
                View schedule
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.15em] uppercase text-[#86988F] z-10">
          scroll — the current continues
        </div>
      </section>

      <section ref={tracksRef} id="tracks" className="bg-paper text-[#101915] px-6 md:px-16 py-24 border-b border-black/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
            <div>
              <div className="font-mono text-xs tracking-[0.2em] uppercase text-flow-deep mb-3">The network</div>
              <h2 className="font-display font-semibold text-3xl md:text-4xl max-w-lg">
                Four recurring events, each with a different job.
              </h2>
            </div>
            <p className="font-body text-[#4C5850] max-w-sm text-sm">
              Every track keeps its own cadence — annual, biannual, quarterly, or rolling —
              instead of forcing everything onto one calendar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
            {TRACKS.map((t) => (
              <Link
                key={t.code}
                to={`/tracks/${t.code}`}
                className="text-left bg-paper hover:bg-paper-raised transition p-8 group block"
              >
                <div className="flex items-center justify-between font-mono text-xs text-[#4C5850] mb-4">
                  <span>{t.code}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-flow group-hover:shadow-[0_0_0_4px_rgba(31,203,178,0.25)] transition" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-1">{t.name}</h3>
                <div className="font-mono text-xs text-flow-deep mb-3">{t.cadence}</div>
                <p className="font-body text-sm text-[#4C5850] mb-5">{t.desc}</p>
                <div className="flex items-center justify-between border-t border-black/10 pt-4">
                  <span className="font-mono text-xs text-[#101915]">{t.next}</span>
                  <span className="font-mono text-xs text-flow-deep opacity-0 group-hover:opacity-100 transition">
                    Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section ref={scheduleRef} id="schedule" className="bg-ink px-6 md:px-16 py-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-flow mb-3">Upcoming</div>
          <h2 className="font-display font-semibold text-3xl md:text-4xl mb-12 text-[#DCE7E2]">
            Next on the calendar.
          </h2>
          <div className="space-y-0">
            {TRACKS.map((t, i) => (
              <Link
                key={t.code}
                to={`/tracks/${t.code}`}
                className="w-full flex items-center justify-between border-t border-white/10 py-5 first:border-t-0 text-left hover:bg-white/[0.03] transition px-2 -mx-2"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#86988F] w-6">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display font-medium text-[#DCE7E2]">{t.name}</span>
                </div>
                <span className="font-mono text-sm text-flow">{t.next}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-6 md:px-16 py-20 text-center border-b border-white/10">
        <h2 className="font-display font-semibold text-3xl md:text-4xl max-w-xl mx-auto mb-4 text-[#DCE7E2]">
          Built by researchers who were tired of conferences that don't fit their field.
        </h2>
        <p className="font-body text-[#86988F] max-w-md mx-auto mb-8">
          No exhibition hall theatrics. Just rooms sized for real conversation, scheduled
          when the work is ready.
        </p>
        <Link
          to="/register"
          className="font-mono text-sm inline-block px-6 py-3 bg-flow text-ink font-semibold rounded-sm hover:bg-[#DCE7E2] transition"
        >
          Register your interest →
        </Link>
      </section>
    </>
  );
}
