# Siddharth & Shrinkhla’s wedding invitation

A mobile-first Next.js invitation inspired by the reference site’s ceremonial flow, with an original visual design and artwork. GSAP and ScrollTrigger animate the hero artwork, invitation sections, and ceremony timeline as guests scroll. Motion is disabled when the visitor requests reduced motion.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Add the wedding details

Edit [`lib/invitation.ts`](lib/invitation.ts). Dates use `YYYY-MM-DD`; leave any unknown field as `null` and the site will show “to be announced.” Add the main venue, address and Google Maps URL there too. The countdown and map link appear automatically when those details are set.

Guests can be greeted by opening the invitation with `?guest=Guest-Name` appended to the URL. The share button copies the general invitation link without the guest name.

The opening envelope appears once per browser session. Reload after clearing session storage to see it again.

The illustration and font files are stored in `public/`, so the invitation renders without third-party asset requests.

Preview images are in [`previews/`](previews/), including the first phone screen, full mobile page, and desktop page.
