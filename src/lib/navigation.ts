export interface Route {
  name:
    "home" | "domains" | "domain" | "concept" | "tracker" | "revision" | "resources" | "settings";
  id?: string;
}

export const parseHash = (hash: string): Route => {
  const cleaned = hash.replace(/^#\/?/, "");
  const [name, id] = cleaned.split("/");
  if (name === "domain" && id) return { name: "domain", id };
  if (name === "concept" && id) return { name: "concept", id };
  if (
    name === "domains" ||
    name === "tracker" ||
    name === "revision" ||
    name === "resources" ||
    name === "settings"
  ) {
    return { name };
  }
  return { name: "home" };
};

export const routeHref = (route: Route) => `#/${route.name}${route.id ? `/${route.id}` : ""}`;
