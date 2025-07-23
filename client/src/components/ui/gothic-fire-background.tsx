import React, { useEffect, useRef } from 'react';

export default function GothicFireBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1, y: -1 });

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
      alpha: number;
      life: number;
      maxLife: number;
      size: number;
    }> = [];

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 3 - 1,
        alpha: Math.random() * 0.8 + 0.2,
        life: 0,
        maxLife: Math.random() * 60 + 30,
        size: Math.random() * 8 + 2,
      };
    };

    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        particle.alpha = Math.max(0, particle.alpha - 0.02);
        particle.size *= 0.98;

        if (particle.life >= particle.maxLife || particle.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      // Generate more interactive particles
      for (let i = 0; i < 5; i++) {
        if (Math.random() < 0.3) {
          particles.push(createParticle(
            Math.random() * canvas.width,
            canvas.height + 10
          ));
        }
      }

      // Add beautiful mouse-following particles with trails
      if (mousePos.current.x !== -1 && Math.random() < 0.5) {
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: mousePos.current.x + (Math.random() - 0.5) * 80,
            y: mousePos.current.y + (Math.random() - 0.5) * 80,
            vx: (Math.random() - 0.5) * 3,
            vy: -Math.random() * 4 - 2,
            alpha: 0.9,
            life: 0,
            maxLife: Math.random() * 40 + 30,
            size: Math.random() * 5 + 3
          });
        }
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        
        // Красивые градиентные частицы
        gradient.addColorStop(0, `rgba(147, 51, 234, ${particle.alpha * 0.8})`);
        gradient.addColorStop(0.3, `rgba(168, 85, 247, ${particle.alpha * 0.6})`);
        gradient.addColorStop(0.6, `rgba(192, 132, 252, ${particle.alpha * 0.4})`);
        gradient.addColorStop(0.8, `rgba(156, 163, 175, ${particle.alpha * 0.2})`);
        gradient.addColorStop(1, `rgba(31, 41, 55, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Mouse tracking for interactive particles
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{ background: 'radial-gradient(circle at bottom, #1a1a1a 0%, #0a0a0a 100%)' }}
    />
  );
}