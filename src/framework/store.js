// =========================================================
// STORE — holds data and tells listeners when it changes.
// ---------------------------------------------------------
//   const store = createStore({ count: 0 });
//   store.state.count            → read
//   store.setState({ count: 1 }) → change + notify listeners
//   store.subscribe(fn)          → fn runs after every change
// =========================================================

export function createStore(initialState) {
  const state = { ...initialState };
  const listeners = [];

  function setState(changes) {
    Object.assign(state, changes);
    listeners.forEach((listener) => listener(state));
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return { state, setState, subscribe };
}
