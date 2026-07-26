import type { ReactNode } from "react";
import {
  BookOpen,
  CalendarCheck,
  Compass,
  Library,
  Menu,
  RotateCcw,
  Settings,
  X
} from "lucide-react";
import { useState } from "react";
import type { Route } from "../lib/navigation";
import { routeHref } from "../lib/navigation";

const navItems: Array<{
  name: Route["name"];
  label: string;
  icon: typeof Compass;
}> = [
  { name: "home", label: "Today", icon: CalendarCheck },
  { name: "domains", label: "Learning map", icon: Compass },
  { name: "tracker", label: "Study log", icon: BookOpen },
  { name: "revision", label: "Review", icon: RotateCcw },
  { name: "resources", label: "Resources", icon: Library },
  { name: "settings", label: "Settings", icon: Settings }
];

const Navigation = ({
  current,
  onNavigate
}: {
  current: Route["name"];
  onNavigate?: () => void;
}) => (
  <nav aria-label="Primary navigation" className="space-y-1">
    {navItems.map(({ name, label, icon: Icon }) => {
      const active =
        current === name ||
        (current === "domain" && name === "domains") ||
        (current === "concept" && name === "domains");
      return (
        <a
          key={name}
          href={routeHref({ name })}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
            active
              ? "bg-moss-100 text-moss-800"
              : "text-black/55 hover:bg-black/[0.035] hover:text-ink"
          }`}
        >
          <Icon size={18} strokeWidth={active ? 2.4 : 1.8} />
          {label}
        </a>
      );
    })}
  </nav>
);

export const Layout = ({ route, children }: { route: Route; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[15.5rem] border-r border-black/[0.06] bg-paper/95 px-5 py-6 backdrop-blur lg:block">
        <a href="#/home" className="mb-9 flex items-center gap-3 px-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink font-display text-lg text-white">
            S
          </span>
          <span>
            <span className="block font-display text-xl font-semibold leading-none">
              Track My Prep
            </span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-black/45">
              Learn with evidence
            </span>
          </span>
        </a>
        <Navigation current={route.name} />
        <div className="absolute inset-x-5 bottom-6 rounded-xl border border-moss-200 bg-moss-50 p-3 text-xs leading-5 text-moss-800">
          Your progress stays in this browser unless you export it.
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-black/[0.06] bg-paper/90 px-4 py-3 backdrop-blur lg:hidden">
        <a href="#/home" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink font-display text-white">
            S
          </span>
          <span className="font-display text-lg font-semibold">Track My Prep</span>
        </a>
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg p-2 text-black/65 hover:bg-black/5"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      {open ? (
        <div className="fixed inset-x-3 top-[4.25rem] z-30 rounded-2xl border border-black/10 bg-paper p-3 shadow-soft lg:hidden">
          <Navigation current={route.name} onNavigate={() => setOpen(false)} />
        </div>
      ) : null}

      <main className="min-w-0 lg:col-start-2">
        <div className="mx-auto min-h-screen max-w-[92rem] px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
};
