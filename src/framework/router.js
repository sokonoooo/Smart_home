// =========================================================
// ROUTER — which page is showing, kept in the URL hash.
// ---------------------------------------------------------
// URL "…/#/energy" means the page named "energy".
// Using the hash means links, reloads and the Back button work
// without needing a server.
//
//   const router = createRouter(["home", "energy"], "home", (name) => …);
//   router.goTo("energy");
// =========================================================

export function createRouter(routeNames, defaultRoute, onRouteChange) {
  function current() {
    const name = window.location.hash.replace("#/", "");
    return routeNames.includes(name) ? name : defaultRoute;
  }

  function goTo(name) {
    window.location.hash = `#/${name}`;
  }

  window.addEventListener("hashchange", () => {
    onRouteChange(current());
    window.scrollTo({ top: 0 });
  });

  // Run once at start so the first page shows.
  onRouteChange(current());

  return { goTo, current };
}
