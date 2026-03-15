
;(function() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  let width, height;
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  resize();
  window.addEventListener('resize', resize);
  
  // Flag colors
  const chinaRed = { r: 222, g: 41, b: 16 };
  const indiaOrange = { r: 255, g: 153, b: 51 };
  const indiaWhite = { r: 255, g: 255, b: 255 };
  const indiaGreen = { r: 19, g: 136, b: 8 };
  
  // Particle configuration
  const config = {
    particleCount: 60,
    connectionDistance: 120,
    moveSpeed: 0.4,
    particleSize: 3
  };
  
  // Color palette for particles - mix of China red and India colors
  const colors = [
    `rgba(${chinaRed.r}, ${chinaRed.g}, ${chinaRed.b}, 0.6)`,
    `rgba(${indiaOrange.r}, ${indiaOrange.g}, ${indiaOrange.b}, 0.6)`,
    `rgba(${indiaWhite.r}, ${indiaWhite.g}, ${indiaWhite.b}, 0.7)`,
    `rgba(${indiaGreen.r}, ${indiaGreen.g}, ${indiaGreen.b}, 0.6)`
  ];
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * config.moveSpeed;
      this.vy = (Math.random() - 0.5) * config.moveSpeed;
      this.size = Math.random() * config.particleSize + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      // Determine which side (China or India) the particle belongs to
      this.side = Math.random() < 0.5 ? 'china' : 'india';
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Bounce off edges
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
  
  // Create particles
  const particles = [];
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Draw connections between particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.connectionDistance) {
          const opacity = 1 - distance / config.connectionDistance;
          // Blend colors based on particle sides
          const color1 = particles[i].side === 'china' ? chinaRed : particles[i].side === 'india' ? indiaOrange : indiaGreen;
          const color2 = particles[j].side === 'china' ? chinaRed : particles[j].side === 'india' ? indiaOrange : indiaGreen;
          
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${(color1.r + color2.r) / 2}, ${(color1.g + color2.g) / 2}, ${(color1.b + color2.b) / 2}, ${opacity * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }
  
  // Draw flag-inspired diagonal bands
  function drawFlagBands() {
    const time = Date.now() * 0.0001;
    const bandWidth = width * 0.15;
    
    // Draw subtle diagonal bands to represent the flags
    ctx.globalAlpha = 0.03;
    
    // China red band (upper left)
    ctx.fillStyle = `rgb(${chinaRed.r}, ${chinaRed.g}, ${chinaRed.b})`;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width * 0.4 + Math.sin(time) * 20, 0);
    ctx.lineTo(width * 0.3 + Math.sin(time) * 20, height);
    ctx.lineTo(0, height);
    ctx.fill();
    
    // India tricolor bands (lower right)
    ctx.fillStyle = `rgb(${indiaOrange.r}, ${indiaOrange.g}, ${indiaOrange.b})`;
    ctx.beginPath();
    ctx.moveTo(width, height);
    ctx.lineTo(width * 0.6 + Math.cos(time) * 20, height);
    ctx.lineTo(width * 0.7 + Math.cos(time) * 20, 0);
    ctx.lineTo(width, 0);
    ctx.fill();
    
    ctx.fillStyle = `rgb(${indiaGreen.r}, ${indiaGreen.g}, ${indiaGreen.b})`;
    ctx.beginPath();
    ctx.moveTo(width, height * 0.7);
    ctx.lineTo(width * 0.5 + Math.cos(time) * 20, height * 0.7);
    ctx.lineTo(width * 0.6 + Math.cos(time) * 20, 0);
    ctx.lineTo(width, 0);
    ctx.fill();
    
    ctx.globalAlpha = 1;
  }
  
  // Draw center divider line (symbolic comparison line)
  function drawCenterLine() {
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, `rgba(${chinaRed.r}, ${chinaRed.g}, ${chinaRed.b}, 0.1)`);
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
    gradient.addColorStop(1, `rgba(${indiaOrange.r}, ${indiaOrange.g}, ${indiaOrange.b}, 0.1)`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  // Animation loop
  function animate() {
    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Draw center gradient
    drawCenterLine();
    
    // Draw flag bands
    drawFlagBands();
    
    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    // Draw connections
    drawConnections();
    
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
})();
