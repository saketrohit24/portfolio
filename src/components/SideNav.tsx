import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "hackathons", label: "Research" },
  { id: "contact", label: "Contact" },
];

export default function SideNav() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(idx); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, idx));
    document.getElementById(SECTIONS[clamped].id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile: prev/next pill above dock */}
      <div className="lg:hidden fixed bottom-20 inset-x-0 z-20 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 bg-card/75 backdrop-blur-md border border-border rounded-full px-1 py-1 shadow-sm">
          <button
            onClick={() => scrollTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            aria-label="Previous section"
            className="flex items-center justify-center size-7 rounded-full text-muted-foreground hover:text-foreground disabled:opacity-25 transition-all duration-200"
          >
            <ChevronLeft className="size-3.5" />
          </button>

          <span className="text-[11px] font-semibold tracking-wide text-foreground min-w-[64px] text-center select-none">
            {SECTIONS[activeIdx].label}
          </span>

          <button
            onClick={() => scrollTo(activeIdx + 1)}
            disabled={activeIdx === SECTIONS.length - 1}
            aria-label="Next section"
            className="flex items-center justify-center size-7 rounded-full text-muted-foreground hover:text-foreground disabled:opacity-25 transition-all duration-200"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Desktop: vertical dots on the right */}
      <nav className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-5 items-end">
        {SECTIONS.map(({ id, label }, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={id}
              onClick={() => scrollTo(idx)}
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
