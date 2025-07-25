import { useEffect, useRef } from 'react';

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.alpha})`;
        ctx.fill();
        
        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        }
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Projects section not found!');
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 z-10">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      <div className="relative z-10 text-center px-6">
        {/* Name */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
          <div className="inline-block bg-black/80 p-4 rounded-lg backdrop-blur-sm">
            <div
              className="text-[4rem] md:text-[6rem] font-extrabold tracking-wider leading-tight"
              style={{
                fontFamily: '"Playfair Display", "Times New Roman", serif',
                fontWeight: 900,
                textShadow: '0 0 10px rgba(147, 51, 234, 0.3)'
              }}
            >
              {'CHALLA SUJAN'.split('').map((letter, index) => (
                <span
                  key={index}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                  style={{
                    
                    display: 'inline-block',
                    backgroundImage: 'linear-gradient(to right, #60a5fa, #a855f7, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>
          </div>
        </h1>
        
        {/* Tagline (Increased Size) */}
        <p
  className="text-2xl md:text-4xl lg:text-5xl mb-8 animate-fade-in leading-relaxed font-bold"
  style={{ color: 'rgba(255, 255, 255, 0.95)' }}
>
          Full Stack Developer • AI/ML Enthusiast • Bridging Creativity with Code • From UI to AI
        </p>
        
        {/* View My Work Button */}
        <div className="flex justify-center animate-fade-in">
          <button 
            onClick={scrollToProjects}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            View My Work
          </button>
        </div>
      </div>
      
    </section>
  );
};
