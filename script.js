document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn'); // Optional toggle button in your HTML

    let isPlaying = false;

    // Function to handle playing audio safely
    const startAudio = () => {
        if (audio && !isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                console.log("Audio started successfully!");
                if (musicBtn) musicBtn.classList.add('playing');
            }).catch(error => {
                console.log("Audio playback failed:", error);
            });
        }

        // Clean up global touch/scroll listeners after first interaction
        ['click', 'touchstart', 'scroll'].forEach(event => {
            document.removeEventListener(event, startAudio);
        });
    };

    // Trigger audio on the very first tap, click, or scroll anywhere on the page
    ['click', 'touchstart', 'scroll'].forEach(event => {
        document.addEventListener(event, startAudio, { once: true });
    });

    // Handle Mute/Play toggle if you have a music icon button in your HTML
    if (musicBtn && audio) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop event from interfering with page click
            if (audio.paused) {
                audio.play();
                musicBtn.classList.add('playing');
            } else {
                audio.pause();
                musicBtn.classList.remove('playing');
            }
        });
    }
});
