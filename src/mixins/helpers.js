export function getNumber(number) {
  let a = Number.parseFloat(number);
  if (isNaN(a)) return number;
  return a.toLocaleString("en-US");
}

export function formatDate(timestamp, format) {
  if (!timestamp || !format) return timestamp;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date(timestamp);
  let hrs = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hrs > 12 ? "PM" : "AM";
  hrs = hrs % 12;
  let year = date.getFullYear();
  let monthIndex = date.getMonth();
  let day = date.getDate();
  return format
    .replace("y", year % 100)
    .replace("Y", year)
    .replace("d", day)
    .replace("h", hrs)
    .replace("i", minutes)
    .replace("s", seconds)
    .replace("a", ampm)
    .replace("m", monthIndex + 1)
    .replace("M", months[monthIndex]);
}

export function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// RANDOM DATA GENERATORS
export function getRandomString(
  size,
  includeNumbers = false,
  onlyNumbers = false
) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz";
  let numbers = "0123456789";
  if (includeNumbers) chars += numbers;
  if (onlyNumbers) chars = numbers;
  let charsCount = chars.length - 1;
  let str = "";
  while (size > 0) {
    str += chars[getRandomNumber(0, charsCount)];
    size--;
  }
  return str;
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
