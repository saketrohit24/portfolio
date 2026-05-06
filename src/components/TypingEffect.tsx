import { useEffect, useState } from "react";

const PHRASES = [
  "building intelligent systems with SNNs, LLMs, and RL.",
  "designing RAG pipelines & agentic AI.",
  "exploring neuromorphic computing.",
  "turning research into real systems.",
];

export default function TypingEffect() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }

    const phrase = PHRASES[phraseIdx];

    if (!deleting && displayed === phrase) {
      setPaused(true);
      return;
    }

    if (deleting && displayed === "") {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
      return;
    }

    const speed = deleting ? 25 : 55;
    const t = setTimeout(() => {
      setDisplayed(deleting
        ? displayed.slice(0, -1)
        : phrase.slice(0, displayed.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, paused, phraseIdx]);

  return (
    <span className="text-muted-foreground md:text-lg lg:text-xl">
      AI/ML Engineer —{" "}
      <span className="text-foreground/80">{displayed}</span>
      <span className="inline-block w-[2px] h-[1em] bg-foreground/60 ml-[1px] align-middle animate-pulse" />
    </span>
  );
}
