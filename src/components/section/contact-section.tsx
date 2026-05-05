import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

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
      <div className="relative flex flex-col items-center gap-6 text-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {DATA.sections.contact.heading}
          </h2>
          <p className="mt-3 mx-auto max-w-lg text-muted-foreground text-balance">
            {DATA.sections.contact.text}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="group flex-1 flex items-center gap-3 px-5 py-3.5 rounded-xl border bg-background hover:bg-muted transition-colors duration-200"
          >
            <span className="flex items-center justify-center size-9 rounded-lg bg-primary/10 text-primary shrink-0">
              <Mail className="size-4" />
            </span>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Email</p>
              <p className="text-sm font-semibold truncate">{DATA.contact.email}</p>
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
          </a>

          <a
            href={`tel:+1${DATA.contact.tel.replace(/\D/g, "")}`}
            className="group flex-1 flex items-center gap-3 px-5 py-3.5 rounded-xl border bg-background hover:bg-muted transition-colors duration-200"
          >
            <span className="flex items-center justify-center size-9 rounded-lg bg-primary/10 text-primary shrink-0">
              <Phone className="size-4" />
            </span>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Phone</p>
              <p className="text-sm font-semibold">{DATA.contact.tel}</p>
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
