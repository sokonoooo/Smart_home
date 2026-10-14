// The toast element lives in index.html: <div class="toast" id="toast" hidden>
let timer;

/** Shows a short message in the corner for 2.4 seconds. */
export function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.hidden = false;
  // Restart the timer so a new message isn't hidden early by an older one.
  clearTimeout(timer);
  timer = setTimeout(() => (toast.hidden = true), 2400);
}
