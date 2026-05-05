import { useEffect, useRef } from "react";

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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      twinkles.length = 0;
      for (let i = 0; i < 80; i++) twinkles.push(makeTwinkle());
    };

    const isDark = () => document.documentElement.classList.contains("dark");

    const makeMeteor = (): Meteor => {
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 6 + 4;
      return {
        x: Math.random() * canvas.width * 1.3 - canvas.width * 0.15,
        y: Math.random() * canvas.height * 0.45,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        length: Math.random() * 140 + 60,
        decay: Math.random() * 0.007 + 0.004,
      };
    };

    const makeTwinkle = (): Twinkle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.008 + 0.003,
      dir: Math.random() > 0.5 ? 1 : -1,
    });

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 3; i++) meteors.push(makeMeteor());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = isDark();

      if (!dark) {
        animId = requestAnimationFrame(draw);
        return;
      }

      // Twinkle stars
      for (const t of twinkles) {
        t.alpha += t.speed * t.dir;
        if (t.alpha >= 1) { t.alpha = 1; t.dir = -1; }
        if (t.alpha <= 0) { t.alpha = 0; t.dir = 1; }

        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${t.alpha * 0.6})`;
        ctx.fill();
      }

      // Spawn new meteors
      if (Math.random() < 0.018 && meteors.length < 10) {
        meteors.push(makeMeteor());
      }

      // Draw meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const speed = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
        const nx = m.vx / speed;
        const ny = m.vy / speed;

        const grad = ctx.createLinearGradient(
          m.x - nx * m.length, m.y - ny * m.length,
          m.x, m.y
        );
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(200,220,255,${m.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(255,255,255,${m.alpha * 0.95})`);

        ctx.beginPath();
        ctx.moveTo(m.x - nx * m.length, m.y - ny * m.length);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Bright head glow
        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 4);
        glow.addColorStop(0, `rgba(255,255,255,${m.alpha})`);
        glow.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.beginPath();
        ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= m.decay;

        if (m.alpha <= 0 || m.x > canvas.width + 300 || m.y > canvas.height + 300) {
          meteors.splice(i, 1);
        }
      }

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
