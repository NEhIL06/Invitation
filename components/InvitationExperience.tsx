"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Music2, Pause } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { brideName, groomName } from "@/lib/invitation";

export function InvitationExperience({ children }: { children: React.ReactNode }) {
  const [cover, setCover] = useState<"sealed" | "playing" | "open">("sealed");
  const [music, setMusic] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const page = useRef<HTMLDivElement>(null);

  const playMusic = useCallback(() => {
    void audio.current?.play().catch(() => setMusic(false));
  }, []);

  useEffect(() => {
    if (cover === "open") playMusic();
  }, [cover, playMusic]);

  useEffect(() => {
    if (cover === "open") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [cover]);

  useEffect(() => {
    if (cover !== "open" || !page.current) return;
    page.current.focus({ preventScroll: true });
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scrolling = new Lenis({
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: .085,
        lerp: .12,
        anchors: true,
        prevent: node => node.matches("dialog, .pull-seal, .book-stage"),
      });
      scrolling.on("scroll", ScrollTrigger.update);
      const tick = (seconds: number) => scrolling.raf(seconds * 1000);
      gsap.ticker.add(tick);
      gsap.from(".hero-type > *", { y: 15, opacity: 0, duration: .75, stagger: .09, clearProps: "all" });
      gsap.to(".hero-scenery", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      const frame = page.current!.querySelector<HTMLElement>(".scroll-frame")!;
      const sheet = frame.querySelector<HTMLElement>(".parchment")!;
      gsap.fromTo(frame, {
        "--rolled": () => Math.max(0, sheet.offsetHeight - frame.clientWidth * .13) + "px",
        "--roller-light": "28%",
      }, {
        "--rolled": "0px",
        "--roller-light": "70%",
        ease: "none",
        scrollTrigger: {
          trigger: frame, start: "top 92%", end: "bottom 80%",
          scrub: .18, invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach(el => {
        gsap.from(el, { y: 22, opacity: 0, duration: .7, clearProps: "all", scrollTrigger: { trigger: el, start: "top 94%", once: true } });
      });
      return () => { gsap.ticker.remove(tick); scrolling.destroy(); };
    }, page);
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, [cover]);

  useEffect(() => {
    if (cover !== "playing") return;
    const limit = window.setTimeout(() => setCover("open"), 8500);
    return () => window.clearTimeout(limit);
  }, [cover]);

  function unseal() {
    // Prepare the player during the tap so it can start after the cover opens.
    audio.current?.load();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCover("open");
      return;
    }
    setCover("playing");
    video.current?.play().catch(() => setCover("open"));
  }

  function toggleMusic() {
    if (music) audio.current?.pause();
    else playMusic();
  }

  return <>
    {cover !== "open" && <div className="cover" role="dialog" aria-modal="true" aria-label="Wedding invitation">
      <video ref={video} className="cover-film" poster="/aarambh/cover.webp" muted playsInline preload="none"
        src="/aarambh/opening.mp4" onEnded={() => setCover("open")} onError={() => { if (cover === "playing") setCover("open"); }} />
      {cover === "sealed" && <button className="unseal" onClick={unseal} aria-label={`Open ${brideName} and ${groomName}’s wedding invitation`} autoFocus />}
    </div>}
    <div ref={page} tabIndex={-1} inert={cover !== "open"} className="invitation">
      {children}
      <audio ref={audio} src="/aarambh/ishq-hai.mp3" preload="metadata" onPlay={() => setMusic(true)} onPause={() => setMusic(false)} onEnded={() => setMusic(false)} />
      <button type="button" className="music" onClick={toggleMusic} aria-pressed={music} aria-label={music ? "Pause Ishq Hai" : "Play Ishq Hai"}>
        {music ? <Pause size={18} /> : <Music2 size={18} />}
      </button>
    </div>
    {cover === "open" && <div className="petals" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <i key={i} style={{ left: (i * 31 % 100) + "%", animationDelay: -(i * 2.7) + "s", animationDuration: (12 + i % 5) + "s" }} />)}</div>}
  </>;
}

