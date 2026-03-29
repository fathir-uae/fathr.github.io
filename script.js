(function() {
  // floating background stars
  const floatingContainer = document.getElementById('floatingStars');
  for(let i = 0; i < 45; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 20 + 6;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 25 + 's';
    star.style.animationDuration = Math.random() * 15 + 12 + 's';
    star.style.opacity = Math.random() * 0.3 + 0.05;
    floatingContainer.appendChild(star);
  }

  // sparkle effect
  function createSparkle(x, y) {
    const spark = document.createElement('div');
    spark.className = 'sparkle';
    spark.style.left = x + 'px';
    spark.style.top = y + 'px';
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 800);
  }

  // confetti burst
  function burstConfettiFrom(x, y) {
    const colors = ['#FFD966', '#FFB347', '#FF8C42', '#F4C542', '#FFA559', '#F9E0A0'];
    const count = 22;
    for(let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('confetti-particle');
      const angle = Math.random() * Math.PI * 2;
      const velocity = 5 + Math.random() * 12;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 6;
      particle.style.left = (x - 5 + Math.random() * 10) + 'px';
      particle.style
