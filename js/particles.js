/* ===================================
   PARTICLE NETWORK BACKGROUND
   Interactive canvas particles with mouse interaction
   =================================== */

class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.animationId = null;
        this.isRunning = false;

        // Config
        this.config = {
            particleCount: 80,
            particleColor: 'rgba(124, 92, 252, 0.6)',
            lineColor: 'rgba(124, 92, 252, 0.12)',
            particleRadius: { min: 1, max: 3 },
            speed: 0.4,
            connectionDistance: 150,
            mouseConnectionDistance: 200,
        };

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
        this.isRunning = true;
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const count = window.innerWidth < 768 ? 40 : this.config.particleCount;

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.speed,
                vy: (Math.random() - 0.5) * this.config.speed,
                radius: Math.random() * (this.config.particleRadius.max - this.config.particleRadius.min) + this.config.particleRadius.min,
                opacity: Math.random() * 0.5 + 0.3,
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    drawParticle(p) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.config.particleColor;
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
    }

    drawLine(p1, p2, distance, maxDistance) {
        const opacity = 1 - (distance / maxDistance);
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.strokeStyle = this.config.lineColor;
        this.ctx.globalAlpha = opacity * 0.5;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
    }

    update() {
        for (let p of this.particles) {
            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off walls
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Mouse interaction - gentle push
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.mouse.radius) {
                    const force = (this.mouse.radius - dist) / this.mouse.radius;
                    p.x += (dx / dist) * force * 1.5;
                    p.y += (dy / dist) * force * 1.5;
                }
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.config.connectionDistance) {
                    this.drawLine(this.particles[i], this.particles[j], dist, this.config.connectionDistance);
                }
            }

            // Draw mouse connections
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.particles[i].x - this.mouse.x;
                const dy = this.particles[i].y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.config.mouseConnectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
                    this.ctx.globalAlpha = 1 - (dist / this.config.mouseConnectionDistance);
                    this.ctx.lineWidth = 0.8;
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }

            // Draw particle
            this.drawParticle(this.particles[i]);
        }
    }

    animate() {
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// Initialize
const particleNetwork = new ParticleNetwork('particles-canvas');
