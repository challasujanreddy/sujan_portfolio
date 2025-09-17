"use client";

import React, { useEffect, useRef, useCallback, useState } from 'react';
import * as THREE from 'three';

export const Hero = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // ✅ Three.js Setup
  useEffect(() => {
    if (!isLoaded || !mountRef.current) return;

    console.log("✅ Starting Three.js setup...");

    // WebGL check
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      console.error("❌ WebGL not supported");
      return;
    }

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
    }

    // ✅ Canvas styles
    const canvas = renderer.domElement;
    canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
      background: transparent;
    `;

    console.log("✅ Canvas appended to DOM");

    // ✅ Create soft circular texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(64, 64, 64, 0, Math.PI * 2);
      ctx.fill();

      return new THREE.CanvasTexture(canvas);
    };

    const circleTexture = createCircleTexture();

    // ✅ Particle system
    const particleCount = isMobile ? 80 : 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Smooth blue → purple → pink gradient
      const hue = 240 + Math.random() * 60; // Blue to pink
      const saturation = 0.7 + Math.random() * 0.3;
      const lightness = 0.6 + Math.random() * 0.2;

      // Convert HSL to RGB
      const hslToRgb = (h: number, s: number, l: number) => {
        h = (h % 1 + 1) % 1;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
        const m = l - c / 2;
        let r, g, b;

        if (h < 1/6) [r, g, b] = [c, x, 0];
        else if (h < 2/6) [r, g, b] = [x, c, 0];
        else if (h < 3/6) [r, g, b] = [0, c, x];
        else if (h < 4/6) [r, g, b] = [0, x, c];
        else if (h < 5/6) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];

        return [r + m, g + m, b + m];
      };

      const [r, g, b] = hslToRgb(hue, saturation, lightness);
      colors[i3] = r;
      colors[i3 + 1] = g;
      colors[i3 + 2] = b;

      sizes[i] = Math.random() * 0.1 + 0.05;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      map: circleTexture,
      alphaTest: 0.1,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // ✅ Animation
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const pos = particleSystem.geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos.array[i3] += Math.sin(time * 0.5 + i) * 0.01;
        pos.array[i3 + 1] += Math.cos(time * 0.7 + i) * 0.01;
        
        // Bounce off boundaries
        if (Math.abs(pos.array[i3]) > 5) pos.array[i3] *= 0.95;
        if (Math.abs(pos.array[i3 + 1]) > 5) pos.array[i3 + 1] *= 0.95;
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // ✅ Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ✅ Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [isLoaded, isMobile]);

  const scrollToProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }, []);

  const name = 'CHALLA SUJAN';
  const nameWithoutSpaces = name.replace(/\s/g, '');
  
  const letterColor = (i: number) => {
    const hue = 210 + ((330 - 210) * i) / Math.max(nameWithoutSpaces.length - 1, 1);
    return `hsl(${hue} 90% 65%)`;
  };

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="text-white text-xl">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 z-10"
      style={{ position: 'relative' }}
    >

      
      {/* ✅ Three.js Canvas Container */}
      <div
        ref={mountRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 animate-fade-in">
          <div className="inline-block">
            <div
              className="font-extrabold tracking-wider leading-tight"
              style={{
                fontFamily: '"Playfair Display", "Times New Roman", serif',
                fontWeight: 900,
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                fontSize: 'clamp(2.5rem, 8vw, 6rem)'
              }}
            >
              {/* Conditional rendering based on screen size */}
              {!isMobile ? (
                // Desktop: Single line
                <div>
                  {name.split('').map((ch, i) => (
                    ch === ' ' ? (
                      <span key={i} style={{ padding: '0 .25ch' }}>{'\u00A0'}</span>
                    ) : (
                      <span
                        key={i}
                        className="inline-block"
                        style={{
                          color: letterColor(name.substring(0, i).replace(/\s/g, '').length),
                          WebkitTextStroke: '0.8px rgba(0,0,0,0.35)',
                          textShadow: '0 2px 6px rgba(0,0,0,0.45), 0 0 12px rgba(147,51,234,0.5), 0 0 22px rgba(99,102,241,0.35)',
                        }}
                      >
                        {ch}
                      </span>
                    )
                  ))}
                </div>
              ) : (
                // Mobile: Split into two lines
                <div>
                  <div className="block">
                    {'CHALLA'.split('').map((ch, i) => (
                      <span
                        key={i}
                        className="inline-block"
                        style={{
                          color: letterColor(i),
                          WebkitTextStroke: '0.8px rgba(0,0,0,0.35)',
                          textShadow: '0 2px 6px rgba(0,0,0,0.45), 0 0 12px rgba(147,51,234,0.5), 0 0 22px rgba(99,102,241,0.35)',
                        }}
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                  <div className="block mt-2">
                    {'SUJAN'.split('').map((ch, i) => (
                      <span
                        key={i + 6}
                        className="inline-block"
                        style={{
                          color: letterColor(i + 6),
                          WebkitTextStroke: '0.8px rgba(0,0,0,0.35)',
                          textShadow: '0 2px 6px rgba(0,0,0,0.45), 0 0 12px rgba(147,51,234,0.5), 0 0 22px rgba(99,102,241,0.35)',
                        }}
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6 md:mb-8 leading-relaxed font-bold text-white/90 px-2">
          <span className="animate-fade-in-word">
            {'Full Stack Developer • AI/ML Enthusiast • Bridging Creativity with Code • From UI to AI'
              .split(' ')
              .map((word, index) => (
                <span
                  key={index}
                  className="inline-block"
                  style={{ 
                    animationDelay: `${index * 0.1}s`, 
                    paddingRight: '0.25em',
                    opacity: 0,
                    animation: 'fadeIn 0.5s ease forwards'
                  }}
                >
                  {word}
                </span>
              ))}
          </span>
        </p>

        <div className="flex justify-center animate-fade-in mt-4 md:mt-6">
          <button 
            onClick={scrollToProjects} 
            className="btn-gradient px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            View My Work
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-word span {
          animation: fadeIn 0.5s ease forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease-out forwards;
        }
        
        /* Remove debug borders */
        .debug-desktop, .debug-mobile {
          border: none;
        }
        
        /* Ensure particles are contained within hero */
        #hero {
          overflow: hidden;
          position: relative;
        }
        
        #hero > div:first-child {
          overflow: hidden;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          #hero h1 {
            line-height: 1.1 !important;
          }
          
          #hero .inline-block {
            margin: 0 1px;
          }
        }
      `}</style>
    </section>
  );
};