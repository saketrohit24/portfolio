import { useEffect, useRef } from "react";

const MAX_COL_WIDTH = 672; // max-w-2xl

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  length: number;
  decay: number;
}

interface Twinkle {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  dir: 1 | -1;
}

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const meteors: Meteor[] = [];
    const twinkles: Twinkle[] = [];

    const gutters = () => {
      const colW = Math.min(MAX_COL_WIDTH, canvas.width);
      const leftEdge = (canvas.width - colW) / 2;
      return { leftEdge, rightEdge: leftEdge + colW };
    };

    const randomX = (leftEdge: number, rightEdge: number) => {
      return Math.random() < 0.5
        ? Math.random() * leftEdge
        : rightEdge + Math.random() * (canvas.width - rightEdge);
    };

    const makeTwinkle = (): Twinkle => {
      const { leftEdge, rightEdge } = gutters();
      return {
        x: randomX(leftEdge, rightEdge),
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.007 + 0.002,
        dir: Math.random() > 0.5 ? 1 : -1,
      };
    };

    const makeMeteor = (): Meteor => {
      const { leftEdge, rightEdge } = gutters();
      // ~45° diagonal with slight random variation
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 4 + 3;
      return {
        x: randomX(leftEdge, rightEdge),
        y: Math.random() * -100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        length: Math.random() * 110 + 50,
        decay: Math.random() * 0.007 + 0.004,
      };
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      twinkles.length = 0;
      for (let i = 0; i < 90; i++) twinkles.push(makeTwinkle());
    };

    const isDark = () => document.documentElement.classList.contains("dark");

    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 3; i++) meteors.push(makeMeteor());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isDark()) {
        animId = requestAnimationFrame(draw);
        return;
      }

      const { leftEdge, rightEdge } = gutters();
      const hasGutter = leftEdge > 50;

      ctx.save();
      ctx.beginPath();
      if (hasGutter) {
        // Only draw in the left and right gutter strips
        ctx.rect(0, 0, leftEdge, canvas.height);
        ctx.rect(rightEdge, 0, canvas.width - rightEdge, canvas.height);
      } else {
        // Narrow viewport: thin vertical strips on each edge
        const strip = canvas.width * 0.12;
        ctx.rect(0, 0, strip, canvas.height);
        ctx.rect(canvas.width - strip, 0, strip, canvas.height);
      }
      ctx.clip();

      // Twinkle stars
      for (const t of twinkles) {
        t.alpha += t.speed * t.dir;
        if (t.alpha >= 1) { t.alpha = 1; t.dir = -1; }
        if (t.alpha <= 0) { t.alpha = 0; t.dir = 1; }
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${t.alpha * 0.55})`;
        ctx.fill();
      }

      // Spawn meteors
      if (Math.random() < 0.006 && meteors.length < 5) {
        meteors.push(makeMeteor());
      }

      // Draw meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const spd = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
        const nx = m.vx / spd;
        const ny = m.vy / spd;

        const grad = ctx.createLinearGradient(
          m.x - nx * m.length, m.y - ny * m.length,
          m.x, m.y
        );
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.5, `rgba(200,220,255,${m.alpha * 0.35})`);
        grad.addColorStop(1, `rgba(255,255,255,${m.alpha * 0.95})`);

        ctx.beginPath();
        ctx.moveTo(m.x - nx * m.length, m.y - ny * m.length);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 5);
        glow.addColorStop(0, `rgba(255,255,255,${m.alpha})`);
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(m.x, m.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= m.decay;

        if (m.alpha <= 0 || m.y > canvas.height + 150) {
          meteors.splice(i, 1);
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}
