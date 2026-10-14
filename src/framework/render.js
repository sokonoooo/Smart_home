// =========================================================
// RENDER — draws HTML into an element.
// ---------------------------------------------------------
// Re-drawing with innerHTML replaces every element, which
// would normally lose the cursor in a text box. mount()
// remembers which input had focus and puts it back.
//
// Two helper attributes you can use in any page:
//   data-autofocus        → this input gets focus after drawing
//   data-scroll="bottom"  → this box scrolls to the bottom (chat)
// =========================================================

export function mount(root, view) {
  return function render() {
    const focused = document.activeElement;
    const focusedId = root.contains(focused) ? focused.id : "";

    root.innerHTML = view();

    const restore = (focusedId && document.getElementById(focusedId)) || root.querySelector("[data-autofocus]");
    if (restore) {
      restore.focus({ preventScroll: true });
      if (restore.setSelectionRange) restore.setSelectionRange(restore.value.length, restore.value.length);
    }

    root.querySelectorAll('[data-scroll="bottom"]').forEach((box) => {
      box.scrollTop = box.scrollHeight;
    });
  };
}
