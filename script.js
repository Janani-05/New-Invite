document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bgMusic");
    const openBtn = document.getElementById("openBtn");
    const overlay = document.getElementById("overlay");
    const musicBtn = document.getElementById("musicBtn");
    const musicText = document.getElementById("musicText");

    let isPlaying = false;

    // Direct user tap unlocks audio context on Mobile Safari & Chrome
    openBtn.addEventListener("click", function () {
        audio.play().then(() => {
            isPlaying = true;
            if (musicText) musicText.innerText = "Pause Music";
            musicBtn.style.backgroundColor = "#ff4757";
        }).catch((err) => {
            console.error("Audio playback error:", err);
        });

        // Hide overlay smoothly
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.style.display = "none";
        }, 500);
    });

    // Manual Toggle Button
    musicBtn.addEventListener("click", function () {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            musicText.innerText = "Play Music";
            musicBtn.style.backgroundColor = "#2ed573";
        } else {
            audio.play().then(() => {
                isPlaying = true;
                musicText.innerText = "Pause Music";
                musicBtn.style.backgroundColor = "#ff4757";
            }).catch((err) => {
                console.error("Playback failed:", err);
            });
        }
    });
});
