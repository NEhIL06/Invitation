"use client";

import { useEffect } from "react";

export function useScrollAnimations(enabled: boolean) {
  useEffect(() => {
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        gsap.fromTo(".hero-copy > :not(.hero-space)", { autoAlpha: 0, y: 12 }, {
          autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.02, ease: "power3.out", clearProps: "opacity,visibility,transform",
        });
        const hero = gsap.timeline({ scrollTrigger: { trigger: ".hero-scroll", start: "top top", end: "bottom bottom", scrub: 0.65 } });
        hero.to(".hero-pillar-left", { xPercent: -68, scale: 1.08, ease: "none" }, 0)
          .to(".hero-pillar-right", { xPercent: 68, scale: 1.08, ease: "none" }, 0)
          .to(".hero-crown", { yPercent: -46, scale: 1.2, ease: "none" }, 0)
          .to(".hero-copy", { yPercent: -11, scale: 0.86, autoAlpha: 0, ease: "none" }, 0.1)
          .to(".scroll-cue", { autoAlpha: 0, ease: "none" }, 0);

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(element, { autoAlpha: 0, y: 34 }, {
            autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", clearProps: "opacity,visibility,transform",
            scrollTrigger: { trigger: element, start: "top 90%", once: true },
          });
        });

        const cards = gsap.utils.toArray<HTMLElement>(".event-stack-card");
        cards.forEach((card, index) => {
          if (index === cards.length - 1) return;
          gsap.to(card, {
            scale: 0.91, autoAlpha: 0.52, ease: "none",
            scrollTrigger: { trigger: cards[index + 1], start: "top 95%", end: "top 14%", scrub: 0.55 },
          });
        });
        gsap.fromTo(".map-route", { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)", ease: "none",
          scrollTrigger: { trigger: ".journey-map", start: "top 85%", end: "center 45%", scrub: 0.6 },
        });
      });
      cleanup = () => context.revert();
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
    }).catch(() => {});

    return () => { cancelled = true; cleanup?.(); };
  }, [enabled]);
}
