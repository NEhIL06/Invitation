"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Heart, Share2 } from "lucide-react";
import { invitation } from "@/lib/invitation";
import { formatDate, formatGuest } from "@/lib/invitation-utils";
import { useScrollAnimations } from "@/lib/use-scroll-animations";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";
import { CeremonyCard } from "@/components/CeremonyCard";
import { ScratchReveal } from "@/components/ScratchReveal";
import { Petals } from "@/components/Petals";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [guest, setGuest] = useState("");
  const [shareLabel, setShareLabel] = useState("Share invitation");
  useScrollAnimations(opened);

  useEffect(() => {
    setGuest(formatGuest(new URLSearchParams(window.location.search).get("guest")));
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [opened]);

  async function share() {
    const data = {
      title: "Siddharth & Shrinkhla | Wedding Invitation",
      text: "With love, Siddharth and Shrinkhla invite you to celebrate their wedding.",
      url: window.location.origin + window.location.pathname,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(data.text + "\n" + data.url);
        setShareLabel("Link copied");
        window.setTimeout(() => setShareLabel("Share invitation"), 2500);
      }
    } catch {}
  }

  return (
    <div className="site-shell">
      {!opened && <EnvelopeIntro guest={guest} onComplete={() => setOpened(true)} />}
      <main className="invite-page" id="top">
        <section className="hero-scroll" aria-label="Wedding invitation">
          <div className="hero-stage">
            <div className="hero-canvas">
              <img className="hero-pillar hero-pillar-left" src="/art/arch-pl.webp" alt="" />
              <img className="hero-pillar hero-pillar-right" src="/art/arch-pr.webp" alt="" />
              <img className="hero-crown" src="/art/arch-cr.webp" alt="" />
              <div className="hero-copy">
                <img className="hero-ganesha" src="/art/ganesha.webp" alt="" />
                <p className="hindi-invocation">॥ श्री गणेशाय नमः ॥</p>
                <div className="hero-space" />
                <p className="hero-eyebrow">TOGETHER WITH THEIR FAMILIES</p>
                <p className="hero-intro">Joyfully invite you to celebrate the wedding of</p>
                <h1><span>Siddharth</span><em>&</em><span>Shrinkhla</span></h1>
                <p className="hero-full-names">SIDDHARTH CHANDRAKAR <span>✦</span> SHRINKHLA CHANDRAKAR</p>
                <p className="hero-date">{invitation.weddingDate ? formatDate(invitation.weddingDate) : "A celebration of love is coming soon"}</p>
                <div className="hero-flourish">✦ &nbsp; ❀ &nbsp; ✦</div>
              </div>
              <div className="scroll-cue"><span>SCROLL TO DISCOVER</span><i /></div>
            </div>
          </div>
        </section>

        <section className="framed-panel family-section" aria-labelledby="family-title">
          <div className="panel-inner">
            <img className="panel-ganesha" src="/art/ganesha.webp" alt="" data-reveal />
            <p className="shloka" data-reveal>वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः ।<br />निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥</p>
            <div className="gold-divider" data-reveal><span>◆</span></div>
            <div className="family-message" data-reveal>
              <p>मंगलमय मिलन</p>
              <strong>दो दिलों का संगम,<br />दो परिवारों का उत्सव।</strong>
              <span>आपके स्नेह और आशीर्वाद से यह शुभ अवसर और भी सुंदर होगा।</span>
            </div>
            <p className="section-kicker" data-reveal>WITH THE BLESSINGS OF OUR FAMILIES</p>
            <h2 id="family-title" data-reveal>Two hearts, one beautiful beginning</h2>
            {guest && <p className="family-guest" data-reveal>Dear {guest},</p>}
            <p className="family-invite" data-reveal>We request the pleasure of your company as we celebrate the union of</p>
            <div className="person" data-reveal><span>वर · THE GROOM</span><strong>Siddharth</strong><small>CHANDRAKAR</small></div>
            <div className="gold-divider short" data-reveal><span>◆</span></div>
            <div className="person" data-reveal><span>वधू · THE BRIDE</span><strong>Shrinkhla</strong><small>CHANDRAKAR</small></div>
            <p className="family-ending" data-reveal>Every love story is beautiful.<br />We cannot wait to share ours with you.</p>
          </div>
        </section>

        <section className="journey-section" aria-labelledby="journey-title">
          <p className="section-kicker" data-reveal>WHERE OUR STORY LEADS</p>
          <h2 id="journey-title" data-reveal>Our Journey</h2>
          <p className="journey-intro" data-reveal>From two paths to one forever</p>
          <div className="journey-map" data-reveal>
            <div className="map-route" />
            <span className="map-pin pin-one"><i>✦</i><b>SIDDHARTH</b></span>
            <span className="map-pin pin-two"><i>✦</i><b>SHRINKHLA</b></span>
            <span className="map-heart">♥</span>
            <span className="map-caption">ONE BEAUTIFUL DESTINATION</span>
          </div>
        </section>

        <section className="framed-panel date-section" aria-labelledby="date-title">
          <div className="panel-inner">
            <p className="section-kicker" data-reveal>शुभ मुहूर्त</p>
            <h2 id="date-title" data-reveal>Save the Date</h2>
            <ScratchReveal date={invitation.weddingDate} />
            <p className="date-note" data-reveal>Mark your heart. The date will find its place soon.</p>
          </div>
        </section>

        <section className="events-section" aria-labelledby="events-title">
          <div className="events-heading" data-reveal>
            <p className="section-kicker">THE FESTIVITIES</p>
            <h2 id="events-title">Moments to Remember</h2>
            <p>Four celebrations. A lifetime of memories.</p>
            <div className="gold-divider"><span>◆</span></div>
          </div>
          <div className="event-stack">
            {invitation.events.map((event, index) => <CeremonyCard event={event} index={index} key={event.id} />)}
          </div>
        </section>

        <section className="framed-panel closing-section" aria-labelledby="closing-title">
          <div className="panel-inner">
            <div className="gold-divider" data-reveal><span>◆</span></div>
            <p className="section-kicker" data-reveal>आकांक्षी · EAGER TO WELCOME YOU</p>
            <h2 id="closing-title" data-reveal>Your presence means the world</h2>
            <p data-reveal>As we begin this new chapter, your blessings and love will make our celebration complete.</p>
            <div className="closing-heart" data-reveal><Heart size={27} strokeWidth={1.2} /></div>
            <strong className="closing-names" data-reveal>Siddharth <i>&</i> Shrinkhla</strong>
            <p className="closing-family" data-reveal>WITH LOVE, THE CHANDRAKAR FAMILIES</p>
            <button className="share-button" type="button" onClick={share}><Share2 size={16} /> {shareLabel} <ArrowUpRight size={14} /></button>
          </div>
        </section>
        <footer>MADE WITH LOVE · SIDDHARTH & SHRINKHLA</footer>
      </main>
      <Petals active={opened} />
    </div>
  );
}
