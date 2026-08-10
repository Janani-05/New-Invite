document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');

    // 1. Audio Auto-Start Fix (Triggers audio on first touch/scratch/scroll)
    const startAudio = () => {
        if (audio) {
            audio.play().then(() => {
                console.log("Audio playing");
            }).catch(e => console.log("Audio blocked:", e));
        }
        ['click', 'touchstart', 'scroll', 'mousedown'].forEach(evt => {
            document.removeEventListener(evt, startAudio);
        });
    };

    ['click', 'touchstart', 'scroll', 'mousedown'].forEach(evt => {
        document.addEventListener(evt, startAudio, { once: true });
    });

    // 2. Gold Canvas Scratch Surface
    const canvas = document.getElementById('scratchCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Fill canvas with gold color
        ctx.fillStyle = '#d4af37';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let isScratching = false;

        const scratch = (e) => {
            if (!isScratching) return;
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const y = (e.clientY || e.touches[0].clientY) - rect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
        };

        canvas.addEventListener('mousedown', () => isScratching = true);
        canvas.addEventListener('mouseup', () => isScratching = false);
        canvas.addEventListener('mousemove', scratch);

        canvas.addEventListener('touchstart', () => isScratching = true);
        canvas.addEventListener('touchend', () => isScratching = false);
        canvas.addEventListener('touchmove', scratch);
    }

    // 3. Countdown Timer to 12th Sept 2026
    const eventDate = new Date('September 12, 2026 19:00:00').getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const difference = eventDate - now;

        if (difference > 0) {
            document.getElementById('days').innerText = Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById('hours').innerText = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById('minutes').innerText = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById('seconds').innerText = Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }
    };

    setInterval(updateTimer, 1000);
    updateTimer();
});
