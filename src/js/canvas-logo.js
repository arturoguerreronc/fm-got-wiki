// Canvas logo functionality
function drawLogo(canvasId, size = 'large') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const scale = size === 'large' ? 1 : 0.67;
  
  // Draw crown
  ctx.fillStyle = '#c0a060';
  ctx.beginPath();
  ctx.moveTo(5 * scale, 40 * scale);
  ctx.lineTo(55 * scale, 40 * scale);
  ctx.lineTo(50 * scale, 30 * scale);
  ctx.lineTo(40 * scale, 35 * scale);
  ctx.lineTo(30 * scale, 15 * scale);
  ctx.lineTo(20 * scale, 35 * scale);
  ctx.lineTo(10 * scale, 30 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Add details
  ctx.fillStyle = '#e0c080';
  ctx.beginPath();
  ctx.arc(30 * scale, 25 * scale, 3 * scale, 0, Math.PI * 2);
  ctx.fill();
}

// Initialize logos when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  drawLogo('logo-canvas', 'large');
  drawLogo('footer-logo-canvas', 'small');
});