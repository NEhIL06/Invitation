"use client";

import { useEffect, useRef, useState } from "react";
import { weddingInstant } from "@/lib/invitation";

function remaining() {
  const seconds = Math.max(0, Math.floor((Date.parse(weddingInstant) - Date.now()) / 1000));
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
}

export function DateReveal() {
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState<number[]>([]);
  const [pull, setPull] = useState(0);
  const start = useRef<number | null>(null);
  useEffect(() => {
    if (!open) return;
    setClock(remaining());
    const interval = window.setInterval(() => setClock(remaining()), 1000);
    return () => window.clearInterval(interval);
  }, [open]);

  return <section className="date-panel velvet" aria-labelledby="date-heading">
    <header><p className="script">A little surprise</p><h2 id="date-heading">Save the Date</h2>
      <p>Pull the seal to uncover our wedding date.</p></header>
    <div className={"date-card" + (open ? " revealed" : "")}>
      <div className="date-inside" aria-hidden={!open}>
        <span className="smallcaps">We’re getting married</span>
        <strong><time dateTime={weddingInstant}>24 January 2027</time></strong><p>Sunday · 2:00 pm IST</p>
        <div className="clock" role="timer" aria-label="Time until the wedding">
          {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => <div key={label}><b>{String(clock[i] ?? 0).padStart(2, "0")}</b><small>{label}</small></div>)}
        </div>
      </div>
      <div className="date-door left" /><div className="date-door right" />
      {!open && <button className="pull-seal" aria-label="Reveal the wedding date" onClick={() => setOpen(true)}
        onPointerDown={e => { start.current = e.clientY; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={e => { if (start.current !== null) { const distance = Math.min(65, Math.max(0, e.clientY - start.current)); setPull(distance); if (distance >= 55) setOpen(true); } }}
        onPointerCancel={() => { start.current = null; setPull(0); }} onPointerUp={() => { start.current = null; setPull(0); }}
        style={{ transform: "translateY(" + pull + "px)" }}><img src="/aarambh/pull.webp" alt="" /><span>Pull down to reveal ↓</span></button>}
    </div>
    <span role="status" className="sr-only">{open ? "The wedding is Sunday, 24 January 2027 at 2 pm India time." : ""}</span>
  </section>;
}

