let count = 0;
let previousOverflow = "";
export function lockScroll() {
  if (count++ === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
}
export function unlockScroll() {
  count = Math.max(0, count - 1);
  if (count === 0) document.body.style.overflow = previousOverflow;
}
