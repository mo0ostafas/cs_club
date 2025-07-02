/*************** canvas grid ***************/
// Grid
const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

// Dynamic resizing canvas grid
function resizeCanvasToHero() {
  const hero = document.querySelector(".hero");
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
};

resizeCanvasToHero();

// Grid config object
const config = {
  gridSize: 40,
  gridColor: "#334155",
  particleCount: 20,
  particleSpeedMin: 0.5,
  particleSpeedMax: 3,
  particleColors: ["#ffffff", "#64748b", "#94a3b8"],
  trailLength: 40,
  backgroundColor: "#0a0a23",
  rippleDuration: 2000,
  rippleMaxRadius: 200,
}

// Grid maipulation
function createGrid() {
  ctx.fillStyle = config.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "rgba(51, 65, 85, 1)");
  gradient.addColorStop(1, "rgba(51, 65, 85, 0)");
  ctx.strokeStyle = gradient;

  for (let y = 0; y < canvas.height; y += config.gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  for (let x = 0; x < canvas.width; x += config.gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
}

// Particles
class Particle {
  constructor() {
    this.color = config.particleColors[Math.floor(Math.random() * config.particleColors.length)];
    this.speed = Math.random() * (config.particleSpeedMax - config.particleSpeedMin) + config.particleSpeedMin;
    this.reset();
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    
    if (this.trail.length > config.trailLength)
      this.trail.shift();
    
    if (this.direction === "horizontal") {
      this.x += this.speed;
      if (this.x > canvas.width) this.reset();
    } else {
      this.y += this.speed;
      if (this.y > canvas.height) this.reset();
    }
  }

  draw() {
    for (let i = 0; i < this.trail.length; i++) {
      const point = this.trail[i];
      const alpha = i / this.trail.length;
      ctx.fillStyle = this.color.replace("1)", `${alpha})`);
      ctx.beginPath();
      ctx.arc(point.x, point.y, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  reset() {
    this.trail = [];
    if (Math.random() > 0.5) {
      this.direction = "horizontal";
      this.x = 0;
      this.y = Math.round(Math.random() * canvas.height);
    } else {
      this.direction = "vertical";
      this.x = Math.round(Math.random() * canvas.width);
      this.y = 0;
    }
    this.speed = Math.random() * (config.particleSpeedMax - config.particleSpeedMin) + config.particleSpeedMin;
  }
}

const particles = Array(config.particleCount).fill().map(() => new Particle());

// Ripples
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";
let ripples = [];

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = config.rippleMaxRadius;
    this.startTime = Date.now();
  }

  update() {
    const elapsed = Date.now() - this.startTime;
    this.radius = (elapsed / config.rippleDuration) * this.maxRadius;
  }

  draw() {
    const alpha = 1 - this.radius / this.maxRadius;
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    if (Math.random() < 0.3) {
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.font = "16px monospace";
      const char = characters[Math.floor(Math.random() * characters.length)];
      ctx.fillText(char, this.x + (Math.random() - 0.5) * this.radius * 2, this.y + (Math.random() - 0.5) * this.radius * 2);
    }
  }

  isComplete() {
    return this.radius >= this.maxRadius;
  }
}

// Handle window resize
window.addEventListener("resize", () => {
  resizeCanvasToHero();
  particles.forEach((particle) => particle.reset());
});

// Add ripple on click
canvas.addEventListener("click", (event) => {
  const x = event.clientX;
  const y = event.clientY;
  ripples.push(new Ripple(x, y));
});

// Animation loop
function animate() {
  createGrid();

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  ripples = ripples.filter((ripple) => !ripple.isComplete());
  ripples.forEach((ripple) => {
    ripple.update();
    ripple.draw();
  });

  setTimeout(animate, 33);
};

animate();
