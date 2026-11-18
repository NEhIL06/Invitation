"use client";

import { useEffect, useRef, useState } from "react";
import { formatDate } from "@/lib/invitation-utils";

export function ScratchReveal({ date }: { date: string | null }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const dragging = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const context = element.getContext("2d");
    if (!context) return;

    const paint = () => {
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      const width = element.clientWidth;
      const height = element.clientHeight;
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.globalCompositeOperation = "source-over";
      context.fillStyle = "#681f34";
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "rgba(230, 194, 139, .75)";
      context.lineWidth = 1;
      context.strokeRect(8, 8, width - 16, height - 16);
      context.fillStyle = "#f8e3bb";
      context.font = "600 15px Cormorant Garamond, Georgia, serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("✦  SCRATCH TO REVEAL  ✦", width / 2, height / 2);
    };

    paint();
    window.addEventListener("resize", paint);
    return () => window.removeEventListener("resize", paint);
  }, []);

  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function scratch(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!dragging.current || revealed) return;
    const context = canvas.current?.getContext("2d");
    if (!context) return;
    const current = point(event);
    context.globalCompositeOperation = "destination-out";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 36;
    context.beginPath();
    context.moveTo(last.current?.x ?? current.x, last.current?.y ?? current.y);
    context.lineTo(current.x + 0.01, current.y);
    context.stroke();
    last.current = current;
  }

  function checkReveal() {
    dragging.current = false;
    last.current = null;
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context || revealed) return;
    const alpha = context.getImageData(0, 0, element.width, element.height).data;
    let cleared = 0;
    let sampled = 0;
    for (let i = 3; i < alpha.length; i += 4 * 28) {
      sampled++;
      if (alpha[i] < 40) cleared++;
    }
    if (cleared / sampled > 0.36) setRevealed(true);
  }

  return (
    <div className="scratch-wrap">
      <div className="scratch-card">
        <span>THE CELEBRATION DATE</span>
        <strong>{date ? formatDate(date, { weekday: undefined }) : "Coming soon"}</strong>
        <small>{date ? "We can't wait to see you" : "A little more magic is on the way"}</small>
        <canvas
          ref={canvas}
          className={revealed ? "scratch-canvas scratched" : "scratch-canvas"}
          aria-label="Scratch to reveal the wedding date"
          role="button"
          tabIndex={0}
          onPointerDown={(event) => {
            dragging.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            scratch(event);
          }}
          onPointerMove={scratch}
          onPointerUp={checkReveal}
          onPointerCancel={checkReveal}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setRevealed(true);
            }
          }}
        />
      </div>
      <button type="button" className="scratch-hint" onClick={() => setRevealed(true)}>
        {revealed ? "We can’t wait to celebrate with you" : "Scratch with your finger or tap to reveal"}
      </button>
    </div>
  );
}
