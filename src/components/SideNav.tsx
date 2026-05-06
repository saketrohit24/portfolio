import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "hackathons", label: "Research" },
  { id: "contact", label: "Contact" },
];

export default function SideNav() {
  const [activeId, setActiveId] = useState("about");

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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
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
  );
}
