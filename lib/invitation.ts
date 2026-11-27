export const venue = {
  name: "Marry Gold Resort",
  road: "Durg–Rajnandgaon Road",
  locality: "Anjora, Durg, Chhattisgarh",
};
// Centre of the resort's listed Plus Code, 568G+HX2 in Durg.
const destination = "21.1663875,81.2273906";
export const directions = "https://www.google.com/maps/dir/?api=1&destination=" + destination;
export const mapEmbed = "https://maps.google.com/maps?q=" + destination + "&z=16&output=embed";
export const weddingInstant = "2027-01-24T14:00:00+05:30";
export const weddingDate = "Sunday, 24 January 2027";

export const people = [
  { role: "The Groom", name: "Dr. Siddharth", portrait: "groom", parents: "Son of Dr. Sudama Chandrakar & Bharti Chandrakar", grandparents: "Grandson of Late Shri Hriday Ram Chandrakar & Late Smt. Belasa Chandrakar" },
  { role: "The Bride", name: "Dr. Shrinkhala", portrait: "bride", parents: "Daughter of Dr. Kamlesh Kumar Chandrakar & Dr. Manisha Chandrakar", grandparents: "Granddaughter of Late Shri Dhani Ram Chandrakar & Smt. Milapa Chandrakar" },
];

export const events = [
  { name: "Haldi / Matrikapujan", date: "Saturday, 23 January", start: "20270123T100000", end: "", time: "10:00 am onwards", art: "haldi" },
  { name: "Sangeet Sandhya", date: "Saturday, 23 January", start: "20270123T190000", end: "20270123T230000", time: "7:00 pm to 11:00 pm", art: "sangeet" },
  { name: "Pool Party", date: "Sunday, 24 January", start: "20270124T100000", end: "", time: "10:00 am", art: "celebration" },
  { name: "Baraat Prasthan", date: "Sunday, 24 January", start: "20270124T120000", end: "", time: "12 noon", art: "hero-wide" },
  { name: "Panigrahan Sanskar", date: "Sunday, 24 January", start: "20270124T140000", end: "", time: "2:00 pm", art: "wedding" },
  { name: "Reception & Dinner", date: "Sunday, 24 January", start: "20270124T200000", end: "", time: "8:00 pm onwards", art: "reception" },
];

export function calendarLink(event: (typeof events)[number]) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.name + " · Siddharth & Shrinkhala",
    dates: event.start + "/" + (event.end || event.start),
    ctz: "Asia/Kolkata",
    location: [venue.name, venue.road, venue.locality].join(", "),
    details: event.time + " (India Standard Time)",
  });
  return "https://calendar.google.com/calendar/render?" + params;
}

export const photos = [
  { id: "2062", alt: "Siddharth and Shrinkhala walking down a sunlit corridor" },
  { id: "2120", alt: "The couple sharing a smile in front of red roses" },
  { id: "2397", alt: "Siddharth offering Shrinkhala a bouquet" },
  { id: "2401", alt: "Shrinkhala holding red roses beside Siddharth" },
  { id: "2505", alt: "Siddharth twirling Shrinkhala by the hand" },
  { id: "2016", alt: "Siddharth and Shrinkhala standing together" },
];
