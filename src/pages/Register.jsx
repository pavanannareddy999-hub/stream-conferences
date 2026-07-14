import { useState } from "react";
import { useLocation } from "react-router-dom";
import { TRACKS } from "../data/tracks.js";

// Swap this for your real Formspree endpoint: https://formspree.io/f/YOUR_FORM_ID
const FORM_ACTION = "https://formspree.io/f/xojgqwvp";

export default function Register() {
  const location = useLocation();
  const preselected = location.state?.track;
  const [selected, setSelected] = useState(preselected ? [preselected] : []);
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const toggle = (code) => {
    setSelected((s) => (s.includes(code) ? s.filter((c) => c !== code) : [...s, code]));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", msg: "" });
    const form = e.target;
    const data = new FormData(form);
    selected.forEach((c) => data.append("tracks", c));
    try {
      const res = await fetch(FORM_ACTION, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        setSelected([]);
        setStatus({ state: "success", msg: "Received — you'll hear from us as dates are confirmed." });
      } else {
        const body = await res.json().catch(() => ({}));
        const msg = (body.errors || []).map((er) => er.message).join(", ") || "Form not found.";
        setStatus({
          state: "error",
          msg: `Could not send (${msg}). Please email hello@stream-conferences.example instead.`,
        });
      }
    } catch (err) {
      setStatus({
        state: "error",
        msg: `Could not send (${err.message}). Please email hello@stream-conferences.example instead.`,
      });
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-16 bg-paper text-[#101915] min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-flow-deep mb-3">Register interest</div>
        <h1 className="font-display font-semibold text-3xl md:text-4xl mb-3">
          Tell us which tracks you're watching.
        </h1>
        <p className="font-body text-[#4C5850] mb-10">
          We'll email you when registration opens and dates are confirmed — no spam, just
          the tracks you pick.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="font-mono text-xs text-[#4C5850]">Full name *</span>
              <input
                name="name"
                required
                className="border border-black/15 bg-paper-raised px-3 py-2.5 font-body text-sm focus:outline-none focus:border-flow-deep"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-xs text-[#4C5850]">Email *</span>
              <input
                type="email"
                name="email"
                required
                className="border border-black/15 bg-paper-raised px-3 py-2.5 font-body text-sm focus:outline-none focus:border-flow-deep"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-xs text-[#4C5850]">Institution / affiliation</span>
            <input
              name="affiliation"
              className="border border-black/15 bg-paper-raised px-3 py-2.5 font-body text-sm focus:outline-none focus:border-flow-deep"
            />
          </label>
          <div>
            <span className="font-mono text-xs text-[#4C5850] block mb-3">Which tracks are you interested in? *</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRACKS.map((t) => (
                <label
                  key={t.code}
                  className={`flex items-start gap-3 border p-3 cursor-pointer transition ${
                    selected.includes(t.code) ? "border-flow-deep bg-paper-raised" : "border-black/15"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(t.code)}
                    onChange={() => toggle(t.code)}
                    className="mt-1"
                  />
                  <span className="font-body text-sm">{t.name}</span>
                </label>
              ))}
            </div>
          </div>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-xs text-[#4C5850]">Access or dietary needs (optional)</span>
            <textarea
              name="notes"
              rows={3}
              className="border border-black/15 bg-paper-raised px-3 py-2.5 font-body text-sm focus:outline-none focus:border-flow-deep"
            />
          </label>

          <button
            type="submit"
            disabled={status.state === "sending" || selected.length === 0}
            className="font-mono text-sm px-6 py-3 bg-[#101915] text-paper font-semibold rounded-sm hover:bg-flow-deep transition disabled:opacity-50"
          >
            {status.state === "sending" ? "Sending…" : "Submit registration →"}
          </button>
          {selected.length === 0 && (
            <p className="font-mono text-xs text-[#4C5850]">Pick at least one track above to enable submit.</p>
          )}
          {status.msg && (
            <p className={`font-mono text-sm ${status.state === "success" ? "text-flow-deep" : "text-[#c0503a]"}`}>
              {status.msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
