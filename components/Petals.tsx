"use client";

import { useReducedMotion } from "motion/react";

const petals = ["rose", "jasmine", "rose", "marigold", "rose", "jasmine", "rose", "marigold", "rose", "jasmine", "rose", "marigold"];

export function Petals({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  if (!active || reduceMotion) return null;

  return (
    <div className="petal-layer" aria-hidden="true">
      {petals.map((type, index) => (
        <img key={index} className={`petal petal-${index + 1}`} src={`/art/petal-${type}.webp`} alt="" />
      ))}
    </div>
  );
}
