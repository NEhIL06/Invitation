# Siddharth & Shrinkhala’s wedding invitation

A mobile invitation for the Chandrakar wedding on 23–24 January 2027. The Design2 branch follows the Shubh Aarambh reference with a filmed opening, a parchment invitation, family portraits, a pull-to-reveal date, a photo gallery, and a programme guests can leaf through.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Wedding details

The [programme and venue details](lib/invitation.ts) supply the event book, calendar links, countdown, and directions. Event times are in India Standard Time. The [invitation page](app/page.tsx) contains the family's wording from the printed cards.

The page serves optimized photographs, illustrations, the opening film, and optional instrumental music from `public/aarambh/`. The venue section embeds Google Maps.
