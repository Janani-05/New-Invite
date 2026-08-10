document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('openBtn');
    const waxSeal = document.getElementById('waxSeal');
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const mainWrapper = document.getElementById('mainWrapper');

    // Envelope Opening Handler
    const handleEnvelopeOpen = () => {
        // Start Audio
        if (audio) {
            audio.play().then(() => console.log("Audio playing")).catch(e => console.log("Audio blocked:", e));
        }

        // Animate Envelope Flap & Inner Card
        envelope.classList.add('open');

        // Transition Overlay to Reveal Main Content
        setTimeout(() => {
            envelopeOverlay.classList.add('fade-out');
            mainWrapper.classList.remove('hidden');
            
            // Re-calculate canvas size after un-hiding content
            initScratchCanvas();
        }, 1200);
    };

    if (openBtn) openBtn.addEventListener('click', handleEnvelopeOpen);
    if (waxSeal) waxSeal.addEventListener('click', handleEnvelopeOpen);

    // Scratch Card Setup
    let canvasInitialized = false;
    function initScratchCanvas() {
        if (canvasInitialized) return;
        const canvas = document.getElementById('scratchCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            ctx.fillStyle = '#d4af37';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let isScratching = false;

            const scratch = (e) => {
                if (!isScratching) return;
                const rect = canvas.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                const x = clientX - rect.left;
                const y = clientY - rect.top;

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

            canvasInitialized = true;
        }
    }

    // Countdown Timer to 12th Sept 2026
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
