import { useEffect, useRef, useCallback } from 'react';

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Hi-DPI crisp canvas
    const setSize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const { innerWidth: w, innerHeight: h } = window;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number; }> = [];
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.1 * (1 - d / 100)})`;
            ctx.stroke();
          }
        }
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => setSize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const scrollToProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Helper: vivid, crisp per-letter color (no bg-clip/text-transparent)
  const name = 'CHALLA SUJAN';
  const total = name.length;
  const letterColor = (i: number) => {
    // Smooth hue from blue (210) → purple (275) → pink (330)
    const hue = 210 + ((330 - 210) * i) / Math.max(total - 1, 1);
    return `hsl(${hue} 90% 65%)`;
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 z-10">
      <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full bg-transparent block -z-10"
      />


      <div className="relative z-10 text-center px-6">
        {/* Name */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
          <div className="inline-block bg-black/80 p-4 rounded-lg shadow-lg">
            <div
              className="text-[4rem] md:text-[6rem] font-extrabold tracking-wider leading-tight"
              style={{
                fontFamily: '"Playfair Display", "Times New Roman", serif',
                fontWeight: 900,
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              {name.split('').map((ch, i) =>
                ch === ' ' ? (
                  <span key={i} style={{ padding: '0 .25ch' }}>{'\u00A0'}</span>
                ) : (
                  <span
                    key={i}
                    className="inline-block"
                    style={{
                      color: letterColor(i),
                      WebkitTextStroke: '0.8px rgba(0,0,0,0.35)',
                      textShadow:
                        '0 2px 6px rgba(0,0,0,0.45), 0 0 12px rgba(147,51,234,0.5), 0 0 22px rgba(99,102,241,0.35)',
                    }}
                  >
                    {ch}
                  </span>
                )
              )}
            </div>
          </div>
        </h1>

      {/* Tagline with Per-Word Animation */}
      <p className="text-2xl md:text-4xl lg:text-5xl mb-8 leading-relaxed font-bold text-white/90">
        <span className="animate-fade-in-word">
          {'Full Stack Developer • AI/ML Enthusiast • Bridging Creativity with Code • From UI to AI'.split(' ').map((word, index) => (
            <span
              key={index}
              style={{ animationDelay: `${index * 0.1}s`, paddingRight: '0.25em' }}
            >
              {word}
            </span>
          ))}
        </span>
      </p>

        {/* View My Work Button */}
        <div className="flex justify-center animate-fade-in">
          <button onClick={scrollToProjects} className="btn-gradient">View My Work</button>
        </div>
      </div>
    </section>
  );
};
