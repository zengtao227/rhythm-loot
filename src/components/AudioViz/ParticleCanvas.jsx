import { useEffect, useRef, useState } from 'react';
import { createFrameLimiter, FPSMonitor } from '../../utils/performanceUtils';

/**
 * Audio-reactive particle system for visual feedback
 * Optimized with frame rate limiting and performance monitoring
 */
export function ParticleCanvas({ theme, audioLevel, isActive }) {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);
    const fpsMonitorRef = useRef(new FPSMonitor());
    const [showStats, setShowStats] = useState(false);
    const [fps, setFps] = useState(0);
    const [particleCount, setParticleCount] = useState(0);

    // Frame rate limiter - 60fps for active practice, 30fps for idle
    const targetFPS = isActive ? 60 : 30;
    const frameLimiterRef = useRef(createFrameLimiter(targetFPS));

    // Update frame limiter when FPS target changes
    useEffect(() => {
        frameLimiterRef.current = createFrameLimiter(targetFPS);
    }, [targetFPS]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Performance stats update interval
        const statsInterval = setInterval(() => {
            setFps(fpsMonitorRef.current.getFPS());
            setParticleCount(particlesRef.current.length);
        }, 500);

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

        // Animation loop with frame rate limiting
        let isRunning = true;
        const animate = () => {
            if (!isRunning) return;

            frameLimiterRef.current(() => {
                fpsMonitorRef.current.tick();

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Spawn burst particles when audio is high (with limit)
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
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            isRunning = false;
            window.removeEventListener('resize', resizeCanvas);
            clearInterval(statsInterval);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [theme, audioLevel, isActive, targetFPS]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="particle-canvas"
                style={{ opacity: isActive ? 1 : 0.4 }}
                onDoubleClick={() => setShowStats(!showStats)}
            />
            {showStats && (
                <div style={{
                    position: 'fixed',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: '#0f0',
                    padding: '10px',
                    borderRadius: '5px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    zIndex: 9999,
                    pointerEvents: 'none'
                }}>
                    <div>FPS: {fps}</div>
                    <div>Particles: {particleCount}</div>
                    <div>Target: {targetFPS} fps</div>
                </div>
            )}
        </>
    );
}

export default ParticleCanvas;
