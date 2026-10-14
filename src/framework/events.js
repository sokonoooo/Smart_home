// =========================================================
// EVENTS — one click listener for the whole page.
// ---------------------------------------------------------
// Instead of adding a listener to every button, we put
// attributes in the HTML and look them up when something
// is clicked ("event delegation"):
//
//   <button data-page="energy">           → navigate(...)
//   <button data-action="toggle-device" data-id="2">
//                                         → actions["toggle-device"]({ id: "2" })
//
// It works for buttons that are added later, too, because
// the listener is on the document, not on the button.
// =========================================================

export function handleClicks({ actions, navigate }) {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-page]");
    if (link) return navigate(link.dataset.page);

    const element = event.target.closest("[data-action]");
    if (!element || element.disabled) return;

    const action = actions[element.dataset.action];
    if (action) action(element.dataset, element);
    else console.warn(`No action named "${element.dataset.action}"`);
  });
}

/** Runs handlers[form.id](form) when a form is submitted, e.g. { "chat-form": (form) => … } */
export function handleForms(handlers) {
  document.addEventListener("submit", (event) => {
    const handler = handlers[event.target.id];
    if (!handler) return;
    event.preventDefault();
    handler(event.target);
  });
}
