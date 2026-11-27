"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, CalendarPlus } from "lucide-react";
import type { PageFlip } from "page-flip";
import { calendarLink, directions, events, venue } from "@/lib/invitation";

const lastSpread = events.length + 1;

function Cover({ back = false }: { back?: boolean }) {
  return <button className={"book-cover" + (back ? " back-cover" : "")} data-action={back ? "restart" : "open"}>
    {back ? <><span>❦</span><strong>With love</strong><span>Siddharth & Shrinkhala</span><b>Read again</b></> : <>
      <img src="/aarambh/gold-ganesh.webp" alt="" />
      <strong>Wedding<br />Functions</strong><span className="cover-rule">❦</span>
      <span className="contents">{events.map(event => <span key={event.name}>{event.name}</span>)}</span>
      <b>Tap to open the book</b>
    </>}
  </button>;
}

function EventLeaf({ index, side }: { index: number; side: "art" | "text" }) {
  const event = events[index];
  return <div className={"book-leaf book-" + side}>
    {side === "art" ? <>
      <span className="smallcaps">Programme · {String(index + 1).padStart(2, "0")}</span>
      <img src={"/aarambh/" + event.art + ".webp"} alt="" loading="lazy" />
      <span className="book-ornament">❦</span>
    </> : <>
      <span className="book-ornament">❦</span><h3>{event.name}</h3>
      <p>{event.date} 2027</p><strong>{event.time}</strong>
      <p>{venue.name}<br />Anjora, Durg</p>
      <a href={directions} target="_blank" rel="noreferrer"><MapPin size={13} />Directions</a>
      <a href={calendarLink(event)} target="_blank" rel="noreferrer"><CalendarPlus size={13} />Calendar</a>
    </>}
  </div>;
}

export function ProgrammeBook() {
  const [spread, setSpread] = useState(0);
  const [ready, setReady] = useState(false);
  const [turning, setTurning] = useState(false);
  const holder = useRef<HTMLDivElement>(null);
  const originals = useRef<HTMLDivElement>(null);
  const engine = useRef<PageFlip | null>(null);
  const position = useRef(0);

  useEffect(() => {
    const mount = holder.current!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let nearby = false;
    let generation = 0;

    async function sync() {
      const ticket = ++generation;
      if (motion.matches) {
        engine.current?.destroy();
        engine.current = null;
        setReady(false);
        setTurning(false);
        return;
      }
      if (!nearby || engine.current) return;
      const library = await import("page-flip").catch(() => null);
      if (!library || ticket !== generation || !originals.current) return;
      const host = document.createElement("div");
      mount.appendChild(host);
      const leaves = Array.from(originals.current.children, node => node.cloneNode(true) as HTMLElement);
      const book = new library.PageFlip(host, {
        width: 250, height: 500, size: "stretch", minWidth: 110, maxWidth: 300,
        minHeight: 220, maxHeight: 600, usePortrait: false, showCover: true,
        startPage: Math.max(0, position.current * 2 - 1), flippingTime: 880,
        drawShadow: true, maxShadowOpacity: .36, showPageCorners: true,
        mobileScrollSupport: true, clickEventForward: true,
      });
      engine.current = book;
      book.on("flip", ({data}) => {
        position.current = Math.ceil(data / 2);
        setSpread(position.current);
      });
      book.on("changeState", ({data}) => setTurning(data === "flipping" || data === "user_fold"));
      book.loadFromHTML(leaves);
      setReady(true);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      nearby = true;
      observer.disconnect();
      void sync();
    }, { rootMargin: "500px" });
    observer.observe(mount.parentElement!);
    motion.addEventListener("change", sync);
    return () => {
      generation++;
      observer.disconnect();
      motion.removeEventListener("change", sync);
      engine.current?.destroy();
      engine.current = null;
    };
  }, []);

  function navigate(next: number) {
    if (next < 0 || next > lastSpread || next === spread || turning) return;
    if (!engine.current) {
      position.current = next;
      setSpread(next);
    } else if (next === 0 && spread === lastSpread) engine.current.turnToPage(0);
    else if (next > spread) engine.current.flipNext("bottom");
    else engine.current.flipPrev("bottom");
  }

  return <section className="programme" aria-labelledby="programme-heading">
    <header data-rise><p className="script">The programme</p><h2 id="programme-heading">Wedding Functions</h2><p>23 & 24 January 2027</p></header>
    <div ref={originals} hidden aria-hidden="true">
      <div data-density="hard"><Cover /></div>
      {events.flatMap((event, index) => (["art", "text"] as const).map(side =>
        <div key={event.name + side}><EventLeaf index={index} side={side} /></div>
      ))}
      <div data-density="hard"><Cover back /></div>
    </div>
    <div className="book-stage" onClick={e => {
      const action = (e.target as Element).closest("[data-action]")?.getAttribute("data-action");
      if (action) navigate(action === "open" ? 1 : 0);
    }}>
      <div ref={holder} className="flip-volume" data-position={turning ? "open" : spread === 0 ? "front" : spread === lastSpread ? "back" : "open"} />
      {!ready && <div className={spread === 0 || spread === lastSpread ? "closed-book" : "book-spread"}>
        {spread === 0 || spread === lastSpread ? <Cover back={spread === lastSpread} /> : <>
          <EventLeaf index={spread - 1} side="art" /><EventLeaf index={spread - 1} side="text" />
        </>}
      </div>}
    </div>
    <nav className="controls" aria-label="Wedding programme pages">
      <button onClick={() => navigate(spread - 1)} disabled={turning || spread === 0} aria-label="Previous programme page"><ChevronLeft /></button>
      <span aria-live="polite">{spread === 0 ? "Front cover" : spread === lastSpread ? "Back cover" : "Function " + spread + " / " + events.length}</span>
      <button onClick={() => navigate(spread + 1)} disabled={turning || spread === lastSpread} aria-label="Next programme page"><ChevronRight /></button>
    </nav>
  </section>;
}

