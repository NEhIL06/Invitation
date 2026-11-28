import { ChevronDown, MapPin, Navigation } from "lucide-react";
import { InvitationExperience } from "@/components/InvitationExperience";
import { DateReveal } from "@/components/DateReveal";
import { PhotoMemories } from "@/components/PhotoMemories";
import { ProgrammeBook } from "@/components/ProgrammeBook";
import { brideName, coupleNames, directions, groomName, mapEmbed, people, venue, weddingDate } from "@/lib/invitation";

function Garland() {
  return <div className="garland" aria-hidden="true">
    {["left", "right"].map(side => <div className={"corner " + side} key={side}>
      <img className="bloom" src="/aarambh/flowers.webp" alt="" /><img className="lamp" src="/aarambh/lantern.webp" alt="" />
    </div>)}
  </div>;
}

export default function Home() {
  return <InvitationExperience>
    <main>
      <section className="hero" aria-labelledby="couple-names">
        <picture className="hero-scenery"><source media="(min-aspect-ratio: 1/1)" srcSet="/aarambh/hero-wide.webp" />
          <img src="/aarambh/hero-mobile.webp" fetchPriority="high" alt="" /></picture>
        <Garland />
        <div className="flock" aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => <span className="dove" key={i}><i /></span>)}
        </div>
        <div className="hero-type"><img className="ganesh" src="/aarambh/ganesh.webp" alt="" />
          <p className="smallcaps">The wedding invitation of</p>
          <h1 id="couple-names">{brideName} <em>&</em> {groomName}</h1>
          <p className="hero-date">24 January 2027 · Durg</p>
        </div>
        <a className="scroll-cue" href="#invitation">Scroll <ChevronDown size={17} /></a>
      </section>

      <section className="letter-section" id="invitation" aria-label="Invitation from the Chandrakar families">
        <div className="scroll-frame">
          <article className="parchment">
            <img className="ganesh" src="/aarambh/ganesh.webp" alt="" />
            <p className="shloka" lang="hi">वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br />निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥</p>
            <div className="rule" />
            <h3>Chandrakar family</h3>
            <p>Requests the honour of your presence and blessings on the auspicious occasion of wedding of</p>
            <h2>Dr. {brideName} <em>with</em> Dr. {groomName}</h2>
            <p className="letter-date">{weddingDate}</p>
          </article>
          <div className="moving-roller" aria-hidden="true" />
        </div>
      </section>

      <section className="couple-section" aria-labelledby="meet-title">
        <Garland /><header data-rise><p className="script">Getting to know us</p><h2 id="meet-title">Meet the Couple</h2><div className="rule" /></header>
        <div className="portraits">{people.map(person => <article className="person" key={person.role} data-rise>
          <div className="portrait"><img className="face" src={"/aarambh/" + person.portrait + ".webp"} alt={person.name + " Chandrakar"} loading="lazy" />
            <img className="portrait-gold" src="/aarambh/frame.webp" alt="" loading="lazy" /></div>
          <p className="smallcaps">{person.role}</p><h3>{person.name} Chandrakar</h3><p>{person.parents}</p><p className="ancestry">{person.grandparents}</p>
        </article>)}</div>
        <p className="couple-note" data-rise>“Your presence will make these events more memorable.”</p>
      </section>
      <DateReveal /><PhotoMemories /><ProgrammeBook />
      <section className="venue velvet" aria-labelledby="venue-title">
        <header data-rise><p className="script">Join us in Durg</p><h2 id="venue-title">The Wedding Venue</h2></header>
        <article className="venue-card">
          <div className="venue-info"><MapPin size={22} /><h3>{venue.name}</h3><address>{venue.plusCode}, {venue.road}<br />{venue.locality}</address>
            <a className="directions" href={directions} target="_blank" rel="noreferrer"><Navigation size={15} /> Get directions</a>
          </div>
          <iframe loading="lazy" title="Map of Marry Gold Resort, Anjora, Durg" src={mapEmbed} referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </article>
      </section>
      <footer className="closing">
        <p className="script" data-rise>With love and warm regards</p>
        <div className="monogram" data-rise>S & S</div><h2>{coupleNames}</h2>
        <img className="divider" src="/aarambh/divider.webp" alt="" loading="lazy" />
        <p>We look forward to welcoming you.</p>
        {/* <details><summary>With the blessings of our families</summary><p>Dr. Sudama & Bharti Chandrakar<br />Smt. Keshrimadhav Chandrakar<br />Mr. Panna & Sudha Chandrakar<br />Dr. Sulabh & Dr. Nandini Chandrakar<br />Navya, Nayra, Nairv</p>
        <p>Tulina & Rakesh · Sushmaprashant<br />Dr. Shraddha & Dr. Shrey · Archana & Kshitij<br />Moulik, Snigdha, Yatharth, Kiara, Avyaan</p></details> */}
        <p className="closing-date">{weddingDate}<br />{venue.name}, Durg</p>
      </footer>
    </main>
  </InvitationExperience>;
}
