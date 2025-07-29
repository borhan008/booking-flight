export const convertTo24Hour = (time12h: string): string => {
  if (/^\d{2}:\d{2}$/.test(time12h)) {
    return time12h;
  }
  const match = time12h.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!match) return "";

  let [_, hour, minute, period] = match;
  let h = parseInt(hour, 10);

  if (period.toUpperCase() === "PM" && h < 12) h += 12;
  if (period.toUpperCase() === "AM" && h === 12) h = 0;

  return `${String(h).padStart(2, "0")}:${minute}`;
};
