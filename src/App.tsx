import { lazy, Suspense, useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { parseHash, type Route } from "./lib/navigation";

const Dashboard = lazy(() =>
  import("./views/Dashboard").then((module) => ({ default: module.Dashboard }))
);
const DomainExplorer = lazy(() =>
  import("./views/Domains").then((module) => ({ default: module.DomainExplorer }))
);
const DomainDetail = lazy(() =>
  import("./views/Domains").then((module) => ({ default: module.DomainDetail }))
);
const ConceptDetail = lazy(() =>
  import("./views/ConceptDetail").then((module) => ({ default: module.ConceptDetail }))
);
const Tracker = lazy(() =>
  import("./views/Tracker").then((module) => ({ default: module.Tracker }))
);
const Revision = lazy(() =>
  import("./views/Revision").then((module) => ({ default: module.Revision }))
);
const ResourceLibrary = lazy(() =>
  import("./views/Resources").then((module) => ({ default: module.ResourceLibrary }))
);
const Settings = lazy(() =>
  import("./views/Settings").then((module) => ({ default: module.Settings }))
);

const useRoute = () => {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    if (!window.location.hash) window.history.replaceState(null, "", "#/home");
    const onHashChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return route;
};

const View = ({ route }: { route: Route }) => {
  switch (route.name) {
    case "domains":
      return <DomainExplorer />;
    case "domain":
      return <DomainDetail id={route.id ?? ""} />;
    case "concept":
      return <ConceptDetail id={route.id ?? ""} />;
    case "tracker":
      return <Tracker />;
    case "revision":
      return <Revision />;
    case "resources":
      return <ResourceLibrary />;
    case "settings":
      return <Settings />;
    default:
      return <Dashboard />;
  }
};

export const App = () => {
  const route = useRoute();
  return (
    <Layout route={route}>
      <Suspense
        fallback={
          <div className="surface flex min-h-64 items-center justify-center p-8" role="status">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-pulse rounded-full bg-moss-200" />
              <p className="mt-3 text-sm font-medium text-black/50">Opening the learning map…</p>
            </div>
          </div>
        }
      >
        <View route={route} />
      </Suspense>
    </Layout>
  );
};
