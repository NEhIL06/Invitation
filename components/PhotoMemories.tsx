"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { photos } from "@/lib/invitation";

export function PhotoMemories() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const swipeX = useRef(0);
  const [active, setActive] = useState(0);
  const [enlarged, setEnlarged] = useState(0);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      if (!track.current || !stage.current) return;
      const bounds = track.current.getBoundingClientRect();
      const distance = bounds.height - stage.current.offsetHeight;
      if (distance > 1) setActive(Math.max(0, Math.min(photos.length - 1, Math.round((-bounds.top / distance) * (photos.length - 1)))));
    }
    function queue() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => { window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); cancelAnimationFrame(frame); };
  }, []);

  function go(index: number) {
    if (!track.current || !stage.current) return;
    const bounds = track.current.getBoundingClientRect();
    const travel = bounds.height - stage.current.offsetHeight;
    if (travel > 1) window.scrollTo({ top: scrollY + bounds.top + travel * index / (photos.length - 1), behavior: "smooth" });
    else setActive(index);
  }
  function showPhoto() {
    setEnlarged(active);
    dialog.current?.showModal();
  }
  function step(by: number) { setEnlarged(i => (i + by + photos.length) % photos.length); }

  return <section className="memories" aria-labelledby="gallery-heading">
    <header data-rise><p className="script">Captured moments</p><h2 id="gallery-heading">Photo Memories</h2><div className="rule" /></header>
    <div ref={track} className="photo-track">
      <div ref={stage} className="photo-stage">
        <div className="festoon" aria-hidden="true">
          {[8, 7, 8].map((count, row) => <svg key={row} className="light-strand" viewBox="0 0 600 68" preserveAspectRatio="none">
            <path className="wire" d="M-8 4 Q300 72 608 4" />
            {Array.from({length: count}, (_, i) => {
              const t = (i + .5) / count;
              const drop = 7 + ((i + row) % 3) * 3;
              return <g key={i} transform={`translate(${600*t} ${4 + 136*t*(1-t)})`}>
                <path className="socket" d={`M0 0v${drop}`} />
                <ellipse className="bulb" cy={drop + 7} rx="8" ry="8" />
              </g>;
            })}
          </svg>)}
        </div>
        <div className="photo-stack">
          {photos.map((photo, i) => <button key={photo.id} aria-hidden={i !== active} tabIndex={i === active ? 0 : -1}
            className={"print " + (i < active ? "past" : i === active ? "current" : i === active + 1 ? "next" : "behind")}
            onClick={showPhoto} aria-label={"Enlarge photograph " + (i + 1) + ". " + photo.alt}>
            <img src={"/aarambh/photo-" + photo.id + ".webp"} loading="lazy" alt={photo.alt} />
          </button>)}
        </div>
        <nav aria-label="Photo memories" className="controls">
          <button onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous photograph"><ChevronLeft /></button>
          <span>{String(active + 1).padStart(2, "0")} / 06</span>
          <button onClick={() => go(active + 1)} disabled={active === photos.length - 1} aria-label="Next photograph"><ChevronRight /></button>
        </nav>
      </div>
    </div>
    <dialog ref={dialog} className="lightbox" aria-label="Photograph viewer"
      onClick={e => { if (e.target === dialog.current) dialog.current?.close(); }}
      onKeyDown={e => { if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); }}>
      <button className="lightbox-close" aria-label="Close photograph" onClick={() => dialog.current?.close()}><X /></button>
      <img src={"/aarambh/photo-" + photos[enlarged].id + ".webp"} alt={photos[enlarged].alt}
        onTouchStart={e => { swipeX.current = e.touches[0].clientX; }}
        onTouchEnd={e => { const distance = e.changedTouches[0].clientX - swipeX.current; if (Math.abs(distance) > 50) step(distance > 0 ? -1 : 1); }} />
      <nav className="controls" aria-label="Enlarged photographs"><button aria-label="Previous enlarged photograph" onClick={() => step(-1)}><ChevronLeft /></button>
        <span>{enlarged + 1} / {photos.length}</span><button aria-label="Next enlarged photograph" onClick={() => step(1)}><ChevronRight /></button></nav>
    </dialog>
  </section>;
}

