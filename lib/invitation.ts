export const venue = {
  name: "Marry Gold Resort",
  plusCode: "568G+HX2",
  road: "Rajnandgaon Road",
  locality: "Anjora, Durg, Chhattisgarh 491001",
};
const venueAddress = [venue.name, venue.plusCode, venue.road, venue.locality].join(", ");
const venuePlaceId = "ChIJWSv0c7g-KToRyGDisYjSYCI";
const destination = encodeURIComponent(venueAddress);
export const directions = `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${venuePlaceId}`;
export const mapEmbed = `https://maps.google.com/maps?q=${destination}&z=16&output=embed`;
export const weddingInstant = "2027-01-24T14:00:00+05:30";
export const weddingDate = "Sunday, 24 January 2027";

export const brideName = "Shrinkhala";
export const groomName = "Siddharth";
export const coupleNames = `${brideName} & ${groomName}`;

export const people = [
  { role: "The Bride", name: `Dr. ${brideName}`, portrait: "bride", parents: "Daughter of Dr. Kamlesh Kumar Chandrakar & Dr. Manisha Chandrakar", grandparents: "Granddaughter of Late Shri Dhani Ram Chandrakar & Smt. Milapa Chandrakar" },
  { role: "The Groom", name: `Dr. ${groomName}`, portrait: "groom", parents: "Son of Dr. Sudama Chandrakar & Bharti Chandrakar", grandparents: "Grandson of Late Shri Hriday Ram Chandrakar & Late Smt. Belasa Chandrakar" },
];

export const events = [
  { name: "Haldi / Matrikapujan", date: "Saturday, 23 January", start: "20270123T100000", end: "", time: "10:00 am onwards", art: "haldi" },
  { name: "Sangeet Sandhya", date: "Saturday, 23 January", start: "20270123T190000", end: "20270123T230000", time: "7:00 pm to 11:00 pm", art: "sangeet" },
  { name: "Pool Party", date: "Sunday, 24 January", start: "20270124T100000", end: "", time: "10:00 am", art: "celebration" },
  { name: "Baraat Prasthan", date: "Sunday, 24 January", start: "20270124T120000", end: "", time: "12 noon", art: "hero-wide" },
  { name: "Panigrahan Sanskar", date: "Sunday, 24 January", start: "20270124T140000", end: "", time: "2:00 pm", art: "wedding" },
  { name: "Reception & Dinner", date: "Sunday, 24 January", start: "20270124T190000", end: "", time: "7:00 pm onwards", art: "reception" },
];

export function calendarLink(event: (typeof events)[number]) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.name} · ${coupleNames}`,
    dates: event.start + "/" + (event.end || event.start),
    ctz: "Asia/Kolkata",
    location: venueAddress,
    details: event.time + " (India Standard Time)",
  });
  return "https://calendar.google.com/calendar/render?" + params;
}

export const photos = [
  { id: "2062", alt: `${brideName} and ${groomName} walking down a sunlit corridor` },
  { id: "2120", alt: "The couple sharing a smile in front of red roses" },
  { id: "2397", alt: `${brideName} receiving a bouquet from ${groomName}` },
  { id: "2401", alt: `${brideName} holding red roses beside ${groomName}` },
  { id: "2505", alt: `${brideName} twirling as ${groomName} holds her hand` },
  { id: "2016", alt: `${brideName} and ${groomName} standing together` },
];
