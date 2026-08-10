document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const overlay = document.getElementById('overlay');
    const audio = document.getElementById('bgMusic');

    openBtn.addEventListener('click', () => {
        // Play the audio
        if (audio) {
            audio.play().then(() => {
                console.log("Audio started successfully!");
            }).catch(error => {
                console.log("Audio playback failed:", error);
            });
        }

        // Hide overlay smoothly
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    });
});
