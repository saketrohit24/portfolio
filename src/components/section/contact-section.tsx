import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { Mail, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">{DATA.sections.contact.label}</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-8 text-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {DATA.sections.contact.heading}
          </h2>
          <p className="mt-3 mx-auto max-w-lg text-muted-foreground text-balance">
            {DATA.sections.contact.text}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="group flex flex-col items-center gap-3 px-4 py-6 rounded-2xl border bg-background/60 hover:bg-muted transition-all duration-200 hover:scale-[1.02]"
          >
            <span className="flex items-center justify-center size-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200">
              <Mail className="size-5" />
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Email</p>
              <p className="text-xs font-semibold break-all leading-snug">{DATA.contact.email}</p>
            </div>
          </a>

          <a
            href={`tel:${DATA.contact.tel}`}
            className="group flex flex-col items-center gap-3 px-4 py-6 rounded-2xl border bg-background/60 hover:bg-muted transition-all duration-200 hover:scale-[1.02]"
          >
            <span className="flex items-center justify-center size-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200">
              <Phone className="size-5" />
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Phone</p>
              <p className="text-xs font-semibold">{DATA.contact.tel}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
