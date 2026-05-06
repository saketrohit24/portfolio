import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "hackathons", label: "Research" },
  { id: "contact", label: "Contact" },
];

export default function SideNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile: horizontal pill strip above dock */}
      <nav className="lg:hidden fixed bottom-20 inset-x-0 z-20 flex justify-center px-4">
        <div className="flex items-center gap-1.5 bg-card/80 backdrop-blur-md border border-border rounded-2xl px-3 py-2 shadow-sm">
          {SECTIONS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-label={`Go to ${label}`}
                className={`px-3 py-1 rounded-xl text-[11px] font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop: vertical dots on the right */}
      <nav className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-5 items-end">
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Navigate to ${label}`}
              className="group flex items-center gap-2.5 cursor-pointer"
            >
              <span
                className={`text-[11px] font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? "opacity-100 text-foreground translate-x-0"
                    : "opacity-0 text-muted-foreground translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-2 h-2 bg-foreground"
                    : "w-1.5 h-1.5 bg-border group-hover:bg-muted-foreground"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
