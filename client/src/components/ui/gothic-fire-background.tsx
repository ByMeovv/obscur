import { useEffect, useRef } from 'react';

export default function GothicFireBackground() {
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

      // Generate new particles from bottom
      for (let i = 0; i < 5; i++) {
        if (Math.random() < 0.3) {
          particles.push(createParticle(
            Math.random() * canvas.width,
            canvas.height + 10
          ));
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
        
        // Gothic gray fire colors
        gradient.addColorStop(0, `rgba(180, 180, 180, ${particle.alpha})`);
        gradient.addColorStop(0.3, `rgba(120, 120, 120, ${particle.alpha * 0.8})`);
        gradient.addColorStop(0.7, `rgba(80, 80, 80, ${particle.alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(40, 40, 40, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

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
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'radial-gradient(circle at bottom, #1a1a1a 0%, #0a0a0a 100%)' }}
    />
  );
}