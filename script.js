document.addEventListener("DOMContentLoaded", () => {
    const enterBtn = document.getElementById("enterBtn");
    const overlay = document.getElementById("entranceOverlay");
    const bgMusic = document.getElementById("bgMusic");

    // Tap to Open Event Handler
    enterBtn.addEventListener("click", () => {
        if (bgMusic) {
            bgMusic.muted = false;
            bgMusic.play().catch(err => {
                console.log("Audio play blocked by browser policy:", err);
            });
        }
        overlay.classList.add("hidden");
    });

    // Countdown Timer Logic
    const targetDate = new Date("August 20, 2026 18:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});
