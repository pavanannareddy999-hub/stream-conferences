import { Link } from "react-router-dom";

export default function Venue() {
  return (
    <div className="pt-28 pb-24 px-6 md:px-16 bg-ink min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-flow mb-3">About &amp; venues</div>
        <h1 className="font-display font-semibold text-3xl md:text-4xl mb-6 text-[#DCE7E2]">
          Why four events instead of one.
        </h1>
        <p className="font-body text-[#86988F] mb-5">
          Most fields get one giant annual conference that tries to be everything — flagship
          talks, early-career mentoring, niche subfield discussion, and casual local meetups,
          all crammed into the same week. Stream splits those jobs apart on purpose, so each
          event can be sized and paced for what it's actually for.
        </p>
        <p className="font-body text-[#86988F] mb-10">
          Venues rotate to keep travel burden distributed across regions rather than always
          favoring the same few cities, and every track publishes its code of conduct and
          accessibility notes well before registration opens.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 mb-10">
          {[
            ["Code of conduct", "Published per-event, enforced by a standing committee independent of organizers."],
            ["Travel & visas", "Invitation letters issued on request; some tracks offer travel grants for early-career attendees."],
            ["Accessibility", "Step-free venues required; live captioning provided at the flagship symposium and forum."],
            ["Contact", "hello@stream-conferences.example"],
          ].map(([label, val]) => (
            <div key={label} className="bg-ink-raised p-6">
              <div className="font-mono text-xs uppercase tracking-[0.1em] text-[#86988F] mb-2">{label}</div>
              <div className="font-body text-sm text-[#DCE7E2]">{val}</div>
            </div>
          ))}
        </div>
        <Link
          to="/register"
          className="inline-block font-mono text-sm px-6 py-3 bg-flow text-ink font-semibold rounded-sm hover:bg-[#DCE7E2] transition"
        >
          Register your interest →
        </Link>
      </div>
    </div>
  );
}
