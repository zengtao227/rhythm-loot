import { useEffect, useRef } from 'react';

/**
 * Audio-reactive particle system for visual feedback
 */
export function ParticleCanvas({ theme, audioLevel, isActive }) {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Theme colors
        const colors = theme === 'blink'
            ? ['#ff2d7f', '#ff6b9d', '#ff91b8', '#ffffff']
            : ['#00d4ff', '#00ffaa', '#ffa500', '#ffffff'];

        // Particle class
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = Math.random() * 0.5 + 0.3;
                this.decay = Math.random() * 0.01 + 0.005;
            }

            update(audioBoost) {
                this.x += this.speedX * (1 + audioBoost * 3);
                this.y += this.speedY * (1 + audioBoost * 3);
                this.alpha -= this.decay * (isActive ? 0.5 : 2);

                if (this.alpha <= 0 ||
                    this.x < 0 || this.x > canvas.width ||
                    this.y < 0 || this.y > canvas.height) {
                    this.reset();
                    this.alpha = Math.random() * 0.5 + 0.3;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fill();

                // Glow effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            }
        }

        // Initialize particles
        const particleCount = isActive ? 80 : 30;
        while (particlesRef.current.length < particleCount) {
            particlesRef.current.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Spawn burst particles when audio is high
            if (isActive && audioLevel > 0.3 && particlesRef.current.length < 150) {
                for (let i = 0; i < 5; i++) {
                    particlesRef.current.push(new Particle());
                }
            }

            // Update and draw particles
            particlesRef.current.forEach(particle => {
                particle.update(audioLevel);
                particle.draw();
            });

            // Remove excess particles when not active
            if (!isActive && particlesRef.current.length > 30) {
                particlesRef.current = particlesRef.current.slice(0, 30);
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [theme, audioLevel, isActive]);

    return (
        <canvas
            ref={canvasRef}
            className="particle-canvas"
            style={{ opacity: isActive ? 1 : 0.4 }}
        />
    );
}

export default ParticleCanvas;
