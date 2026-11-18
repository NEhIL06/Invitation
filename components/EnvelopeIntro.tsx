"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";

type Props = { onComplete: () => void; guest: string };

export function EnvelopeIntro({ onComplete, guest }: Props) {
  const [opening, setOpening] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const envelope = useRef<HTMLDivElement>(null);
  const flap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const seal = useRef<HTMLImageElement>(null);
  const gate = useRef<HTMLDivElement>(null);
  const gateStage = useRef<HTMLDivElement>(null);
  const doorLeft = useRef<HTMLDivElement>(null);
  const doorRight = useRef<HTMLDivElement>(null);
  const introTop = useRef<HTMLDivElement>(null);
  const introHint = useRef<HTMLDivElement>(null);

  function open() {
    if (opening) return;
    setOpening(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const timeline = gsap.timeline({ onComplete });
    timeline
      .to([introTop.current, introHint.current], { autoAlpha: 0, y: -12, duration: 0.32, stagger: 0.07 })
      .to(seal.current, { scale: 1.25, rotation: 16, autoAlpha: 0, duration: 0.38, ease: "power2.in" }, 0.1)
      .to(flap.current, { rotationX: -178, duration: 0.8, ease: "power2.inOut" }, 0.38)
      .to(card.current, { yPercent: -52, duration: 0.86, ease: "power2.out" }, 0.9)
      .to(envelope.current, { yPercent: 18, scale: 0.73, autoAlpha: 0, duration: 0.7, ease: "power2.in" }, 1.68)
      .set(gate.current, { visibility: "visible" }, 1.84)
      .fromTo(gate.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.48 }, 1.84)
      .fromTo(gateStage.current, { scale: 0.68 }, { scale: 1, duration: 0.9, ease: "power3.out" }, 1.84)
      .to(doorLeft.current, { rotationY: -85, duration: 1.25, ease: "power3.inOut" }, 2.7)
      .to(doorRight.current, { rotationY: 85, duration: 1.25, ease: "power3.inOut" }, 2.7)
      .to(gateStage.current, { scale: 2.9, duration: 0.9, ease: "power2.inOut" }, 3.45)
      .to(root.current, { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" }, 3.73);
  }

  return (
    <div ref={root} className="opening-screen" role="dialog" aria-modal="true" aria-label="Open wedding invitation">
      <div className="opening-top" ref={introTop}>
        <img src="/art/ganesha.webp" alt="" />
        <p>॥ श्री गणेशाय नमः ॥</p>
      </div>

      <div className="opening-envelope" ref={envelope}>
        <div className="envelope-paper" />
        <div className="envelope-card" ref={card}>
          <span>शुभ विवाह</span>
          <strong>Siddharth <i>&</i> Shrinkhla</strong>
          <small>WITH LOVE, YOU ARE INVITED</small>
        </div>
        <div className="envelope-front" />
        <div className="envelope-flap" ref={flap} />
        <img className="envelope-seal" ref={seal} src="/art/seal.webp" alt="" />
        <button type="button" className="envelope-hit" onClick={open} disabled={opening} aria-label="Open the invitation" />
      </div>

      <div className="opening-hint" ref={introHint}>
        {guest && <span>आदरणीय {guest},</span>}
        <strong>सपरिवार सादर आमंत्रित</strong>
        <button type="button" onClick={open} disabled={opening}>TAP THE SEAL TO OPEN</button>
      </div>

      <div className="gate-scene" ref={gate} aria-hidden="true">
        <div className="gate-stage" ref={gateStage}>
          <div className="gate-glow" />
          <div className="gate-door gate-door-left" ref={doorLeft}><img src="/art/gate-door-l.webp" alt="" /></div>
          <div className="gate-door gate-door-right" ref={doorRight}><img src="/art/gate-door-r.webp" alt="" /></div>
          <img className="gate-frame" src="/art/gate-frame.webp" alt="" />
        </div>
      </div>
    </div>
  );
}
