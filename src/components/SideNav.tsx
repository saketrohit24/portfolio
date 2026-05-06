import { useEffect, useState, useRef } from "react";
import { Compass } from "lucide-react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "hackathons", label: "Research" },
  { id: "contact", label: "Contact" },
];

export default function SideNav() {
  const [activeId, setActiveId] = useState("about");
  const [open, setOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let current = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= mid) current = id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent | TouchEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    if (id === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile FAB */}
      <div
        ref={fabRef}
        className="lg:hidden fixed bottom-20 right-4 z-20 flex flex-col items-end gap-2"
      >
        {/* Section menu — fades up when open */}
        <div className={`flex flex-col overflow-hidden rounded-2xl border bg-card/90 backdrop-blur-md shadow-lg transition-all duration-250 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}>
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-5 py-2.5 text-sm font-medium text-left whitespace-nowrap transition-colors duration-150 ${
                activeId === id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* FAB button */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Navigate sections"
          className={`flex items-center justify-center size-9 rounded-full border shadow-md backdrop-blur-md transition-all duration-200 ${
            open
              ? "bg-foreground text-background border-foreground"
              : "bg-card/90 text-muted-foreground border-border hover:text-foreground"
          }`}
        >
          <Compass className={`size-4 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
        </button>
      </div>

      {/* Desktop: vertical dots on the right */}
      <nav className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-5 items-end">
        {SECTIONS.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Navigate to ${label}`}
              className="group flex items-center gap-2.5 cursor-pointer"
            >
              <span className={`text-[11px] font-medium tracking-wide transition-all duration-300 ${
                isActive
                  ? "opacity-100 text-foreground translate-x-0"
                  : "opacity-0 text-muted-foreground translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
              }`}>
                {label}
              </span>
              <span className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "w-2 h-2 bg-foreground"
                  : "w-1.5 h-1.5 bg-border group-hover:bg-muted-foreground"
              }`} />
            </button>
          );
        })}
      </nav>
    </>
  );
}
