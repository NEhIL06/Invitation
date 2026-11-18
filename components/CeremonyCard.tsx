"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { invitation } from "@/lib/invitation";
import { calendarUrl, formatDate } from "@/lib/invitation-utils";

type Event = (typeof invitation.events)[number];

const art: Record<string, { background: string; illustration: string; top?: string; bottom?: string }> = {
  tilak: { background: "bg_tilak.webp", illustration: "tilak-m.webp", top: "toran-m.webp" },
  haldi: { background: "bg_haldi.webp", illustration: "haldi-m.webp", top: "toran-m.webp" },
  mehndi: { background: "bg_mehndi.webp", illustration: "mehndi-m.webp", top: "garland-m.webp" },
  wedding: { background: "bg_barat.webp", illustration: "shubh-vivah-v2.webp", bottom: "zardozi-m.webp" },
};

export function CeremonyCard({ event, index }: { event: Event; index: number }) {
  const reduceMotion = useReducedMotion();
  const visual = art[event.id];
  const date = event.date || (event.id === "wedding" ? invitation.weddingDate : null);
  const venue = event.venue || (event.id === "wedding" ? invitation.venue : null);

  return (
    <div className={`event-stack-card event-${event.id}`}>
      <motion.article
        className="ceremony-card"
        style={{ backgroundImage: `url(/art/${visual.background})` }}
        initial={reduceMotion ? false : { opacity: 0, y: 76, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ type: "spring", stiffness: 84, damping: 20, mass: 0.85 }}
      >
        {visual.top && (
          <motion.img
            className="ceremony-top-art"
            src={`/art/${visual.top}`}
            alt=""
            initial={reduceMotion ? false : { opacity: 0, y: -42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.18, ease: "easeOut" }}
          />
        )}

        <motion.div
          className="ceremony-details"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <motion.div
            className="ceremony-medallion"
            initial={reduceMotion ? false : { rotate: -30, scale: 0.7 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.35 }}
          >
            S <span>&</span> S
          </motion.div>
          <p className="ceremony-number">CELEBRATION {String(index + 1).padStart(2, "0")} OF 04</p>
          <div className="ceremony-rule" />
          <p className="ceremony-date"><CalendarDays size={13} strokeWidth={1.4} /> {date ? formatDate(date) : "DATE TO BE ANNOUNCED"}</p>
          <h3>{event.name} <span>{event.hindi}</span></h3>
          <p className="ceremony-note">{event.note}</p>
          <p className="ceremony-venue"><MapPin size={14} strokeWidth={1.4} /> {venue || "Venue to be announced"}</p>
          {event.time && <p className="ceremony-time">{event.time}</p>}
          <div className="ceremony-actions">
            {event.id === "wedding" && invitation.mapUrl && (
              <a href={invitation.mapUrl} target="_blank" rel="noopener noreferrer" className="ceremony-direction">Directions <ArrowUpRight size={14} /></a>
            )}
            {date && (
              <a href={calendarUrl(event.name, date, venue)} target="_blank" rel="noopener noreferrer" className="ceremony-calendar">Add to calendar</a>
            )}
          </div>
        </motion.div>

        <motion.div
          className="ceremony-art-frame"
          initial={reduceMotion ? false : { opacity: 0, y: 48, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
        >
          <img src={`/art/${visual.illustration}`} alt={`${event.name} celebration illustration`} />
        </motion.div>

        {visual.bottom && <img className="ceremony-bottom-art" src={`/art/${visual.bottom}`} alt="" />}
      </motion.article>
    </div>
  );
}
