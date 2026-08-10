document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const overlay = document.getElementById('overlay');
    const audio = document.getElementById('bgMusic');

    if (openBtn && overlay && audio) {
        openBtn.addEventListener('click', () => {
            // Play background music
            audio.play().then(() => {
                console.log("Audio started playing successfully!");
            }).catch(error => {
                console.log("Audio playback failed:", error);
            });

            // Smoothly fade out overlay screen
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        });
    }
});
