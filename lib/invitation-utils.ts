export function formatDate(date: string | null, options?: Intl.DateTimeFormatOptions) {
  if (!date) return "Date to be announced";
  return new Date(`${date}T12:00:00+05:30`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
    ...options,
  });
}

export function calendarUrl(title: string, date: string, venue?: string | null) {
  const start = date.replaceAll("-", "");
  const endDate = new Date(`${date}T12:00:00Z`);
  endDate.setUTCDate(endDate.getUTCDate() + 1);
  const end = endDate.toISOString().slice(0, 10).replaceAll("-", "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${title} · Siddharth & Shrinkhla`,
    dates: `${start}/${end}`,
    details: "With love, Siddharth and Shrinkhla invite you to celebrate with them.",
  });
  if (venue) params.set("location", venue);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function formatGuest(value: string | null) {
  if (!value) return "";
  return value
    .replace(/[-_]+/g, " ")
    .replace(/[^\p{L}\p{M} .']/gu, "")
    .trim()
    .slice(0, 48)
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
