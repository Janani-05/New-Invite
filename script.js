document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. PRELOADER
       ========================================== */
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 600);
    });

    /* ==========================================
       2. BACKGROUND MUSIC LOGIC
       ========================================== */
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    const musicIcon = document.getElementById('musicIcon');
    let isPlaying = false;

    function playAudio() {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicIcon.className = 'fa-solid fa-volume-high';
            musicBtn.classList.add('playing');
        }).catch(err => console.log("Autoplay waiting for touch gesture:", err));
    }

    function toggleMusic(e) {
        if (e) e.stopPropagation();
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.className = 'fa-solid fa-volume-xmark';
            musicBtn.classList.remove('playing');
            isPlaying = false;
        } else {
            playAudio();
        }
    }

    musicBtn.addEventListener('click', toggleMusic);

    // Auto-start music on first interaction (bypasses browser autoplay restrictions)
    const enableAudioOnInteraction = () => {
        if (!isPlaying) playAudio();
        window.removeEventListener('touchstart', enableAudioOnInteraction);
        window.removeEventListener('click', enableAudioOnInteraction);
    };

    window.addEventListener('touchstart', enableAudioOnInteraction, { once: true });
    window.addEventListener('click', enableAudioOnInteraction, { once: true });

    /* ==========================================
       3. FLOATING PARTICLES CANVAS
       ========================================== */
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 60;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = -Math.random() * 0.6 - 0.2;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.color = `rgba(212, 175, 55, ${this.opacity})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
                this.y = canvas.height + 10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* ==========================================
       4. SCRATCH CARD LOGIC
       ========================================== */
    const scratchCanvas = document.getElementById('scratchCanvas');
    const sCtx = scratchCanvas.getContext('2d');
    let isScratching = false;

    function initScratchCard() {
        const rect = scratchCanvas.parentElement.getBoundingClientRect();
        scratchCanvas.width = rect.width;
        scratchCanvas.height = rect.height;

        const grad = sCtx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
        grad.addColorStop(0, '#bf953f');
        grad.addColorStop(0.25, '#fcf6ba');
        grad.addColorStop(0.5, '#b38728');
        grad.addColorStop(0.75, '#fbf5b7');
        grad.addColorStop(1, '#aa7c11');

        sCtx.fillStyle = grad;
        sCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);

        sCtx.font = 'bold 16px Cinzel';
        sCtx.fillStyle = '#111111';
        sCtx.textAlign = 'center';
        sCtx.fillText('✨ SCRATCH HERE ✨', scratchCanvas.width / 2, scratchCanvas.height / 2);
    }

    initScratchCard();

    function getScratchPos(e) {
        const rect = scratchCanvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function scratch(e) {
        if (!isScratching) return;
        e.preventDefault();
        const pos = getScratchPos(e);
        sCtx.globalCompositeOperation = 'destination-out';
        sCtx.beginPath();
        sCtx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);
        sCtx.fill();
    }

    scratchCanvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
    scratchCanvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => { isScratching = false; });

    scratchCanvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); });
    scratchCanvas.addEventListener('touchmove', scratch);
    window.addEventListener('touchend', () => { isScratching = false; });

    /* ==========================================
       5. COUNTDOWN TIMER
       ========================================== */
    const targetDate = new Date('2026-09-12T19:00:00+05:30').getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById('timer').innerHTML = '<h3 style="color:var(--gold-light);">The Reception Has Begun!</h3>';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    /* ==========================================
       6. SCROLL REVEAL ANIMATION
       ========================================== */
    const reveals = document.querySelectorAll('.scroll-reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
