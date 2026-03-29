// Card Flip Logic
const cardInner = document.getElementById('cardInner');
const flipToEidBtn = document.getElementById('flipToEidBtn');
const flipToBirthdayBtn = document.getElementById('flipToBirthdayBtn');

function flipToEid() {
    cardInner.classList.add('flipped');
}

function flipToBirthday() {
    cardInner.classList.remove('flipped');
}

flipToEidBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    flipToEid();
});

flipToBirthdayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    flipToBirthday();
});

// Optional: Click anywhere on card to flip (toggle)
cardInner.addEventListener('click', (e) => {
    // Prevent toggling if clicking on buttons
    if (e.target.closest('.flip-btn')) return;
    
    if (cardInner.classList.contains('flipped')) {
        flipToBirthday();
    } else {
        flipToEid();
    }
});

// Particle System (Confetti/Floating sparkles)
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        // Create initial particles
        for (let i = 0; i < 80; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle() {
        const types = ['star', 'circle', 'diamond'];
        const colors = ['#FFD700', '#FF6B9D', '#F9D56E', '#FFB347', '#FF69B4', '#C44569'];
        
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 4 + 2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: Math.random() * 1 + 0.3,
            opacity: Math.random() * 0.5 + 0.2,
            type: types[Math.floor(Math.random() * types.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02
        };
    }
    
    drawStar(ctx, x, y, size) {
        const spikes = 5;
        let rot = Math.PI / 2 * 3;
        const step = Math.PI / spikes;
        
        ctx.beginPath();
        for (let i = 0; i < spikes; i++) {
            const x1 = x + Math.cos(rot) * size;
            const y1 = y + Math.sin(rot) * size;
            ctx.lineTo(x1, y1);
            rot += step;
            
            const x2 = x + Math.cos(rot) * (size * 0.5);
            const y2 = y + Math.sin(rot) * (size * 0.5);
            ctx.lineTo(x2, y2);
            rot += step;
        }
        ctx.closePath();
        ctx.fill();
    }
    
    drawDiamond(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size, y);
        ctx.closePath();
        ctx.fill();
    }
    
    update() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;
            
            // Reset particles that go off screen
            if (p.y > this.canvas.height + 50) {
                p.y = -50;
                p.x = Math.random() * this.canvas.width;
            }
            if (p.x < -50) p.x = this.canvas.width + 50;
            if (p.x > this.canvas.width + 50) p.x = -50;
            
            // Fade in and out slightly
            p.opacity = 0.3 + Math.sin(Date.now() * 0.001 * (p.x * 0.01)) * 0.2;
        }
        
        // Add new particles occasionally
        if (this.particles.length < 120 && Math.random() < 0.02) {
            this.particles.push(this.createParticle());
        }
        
        // Remove old particles if too many
        if (this.particles.length > 150) {
            this.particles.shift();
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (const p of this.particles) {
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fillStyle = p.color;
            
            switch(p.type) {
                case 'star':
                    this.drawStar(this.ctx, 0, 0, p.size);
                    break;
                case 'diamond':
                    this.drawDiamond(this.ctx, 0, 0, p.size);
                    break;
                default:
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                    this.ctx.fill();
            }
            
            this.ctx.restore();
        }
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
const canvas = document.getElementById('particlesCanvas');
const particleSystem = new ParticleSystem(canvas);

// Add floating hearts/confetti effect on card flip
function createTemporaryConfetti() {
    const confettiCount = 30;
    const container = document.querySelector('.container');
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '🎊', '✨', '⭐', '🌙', '🕌', '🎂'][Math.floor(Math.random() * 7)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '50%';
        confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.style.opacity = '1';
        confetti.style.animation = `floatUp ${Math.random() * 1 + 1}s ease-out forwards`;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 1500);
    }
}

// Add CSS animation for confetti
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-200px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// Trigger confetti on flip
flipToEidBtn.addEventListener('click', () => {
    createTemporaryConfetti();
    // Add a subtle sound-like vibration (if supported)
    if (navigator.vibrate) navigator.vibrate(100);
});

flipToBirthdayBtn.addEventListener('click', () => {
    createTemporaryConfetti();
    if (navigator.vibrate) navigator.vibrate(100);
});

// Music/Sound toggle (optional - just UI feedback)
const musicToggle = document.getElementById('musicToggle');
let soundEnabled = false;

musicToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    musicToggle.style.opacity = soundEnabled ? '1' : '0.5';
    
    // Simple beep simulation using Web Audio (optional)
    if (soundEnabled) {
        // Just visual feedback, you can add actual sound if desired
        musicToggle.querySelector('.music-icon').style.transform = 'scale(1.1)';
        setTimeout(() => {
            musicToggle.querySelector('.music-icon').style.transform = 'scale(1)';
        }, 200);
    }
});

// Add hover effect for the entire card
cardInner.addEventListener('mouseenter', () => {
    cardInner.style.transition = 'transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1)';
});

// Initialize with a welcome burst
setTimeout(() => {
    createTemporaryConfetti();
}, 500);

// Add dynamic date greeting
const currentDate = new Date();
const month = currentDate.getMonth();
// Optional: Show seasonal message (just for fun)
console.log('Card loaded - Special greetings for friend!');
