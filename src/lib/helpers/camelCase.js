export function camelCase(value) {
  return value
    .replace(/[^A-Za-z0-9 ]/gi, " ")
    .split(" ")
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(" ");
}
