let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let long = document.getElementById("long-timer");
let currentTimer = null;
let pause_play_state = 'play';
let myInterval = null;
let remainingTime = 0;

const Pomodoro_session_btn = document.getElementById("pomodoro-session");
const short_break_btn = document.getElementById("short-break");
const long_break_btn = document.getElementById("long-break");

function showDefaultTimer() {
    pomodoro.style.display = "block";
    short.style.display = "none";
    long.style.display = "none";
}

showDefaultTimer();

function hideAll() {
    let timers = document.querySelectorAll(".timer-display");
    timers.forEach((timer) => (timer.style.display = "none"));
}

Pomodoro_session_btn.addEventListener("click", function () {
    hideAll();
    pomodoro.style.display = "block";
    currentTimer = pomodoro;
    short_break_btn.classList.remove('active');
    Pomodoro_session_btn.classList.add('active');
    long_break_btn.classList.remove('active');
    document.getElementById("reset-message").style.display = "none";
});

short_break_btn.addEventListener("click", function () {
    hideAll();
    short.style.display = "block";
    currentTimer = short;
    short_break_btn.classList.add('active');
    Pomodoro_session_btn.classList.remove('active');
    long_break_btn.classList.remove('active');
    document.getElementById("reset-message").style.display = "none";
});

long_break_btn.addEventListener("click", function () {
    hideAll();
    long.style.display = "block";
    currentTimer = long;
    short_break_btn.classList.remove('active');
    Pomodoro_session_btn.classList.remove('active');
    long_break_btn.classList.add('active');
    document.getElementById("reset-message").style.display = "none";
});

function startTimer(timerDisplay, duration) {
    if (myInterval) {
        clearInterval(myInterval);
    }

    let endTimestamp = Date.now() + duration;

    myInterval = setInterval(function () {
        remainingTime = endTimestamp - Date.now();

        if (remainingTime <= 0) {
            clearInterval(myInterval);
            timerDisplay.textContent = "00:00";
            pause_play_state = 'play';
            document.getElementById("start").innerHTML = "Play";
            remainingTime = 0;
        } else if (remainingTime <= 5000) {
            const alarm = new Audio("./clock_alarm.mp3");
            alarm.play();
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = ((remainingTime % 60000) / 1000).toFixed(0);
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
            timerDisplay.textContent = formattedTime;
        } else {
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = ((remainingTime % 60000) / 1000).toFixed(0);
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
            timerDisplay.textContent = formattedTime;
        }
    }, 1000);
}

document.getElementById("start").addEventListener("click", function () {
    if (pause_play_state === 'play') {
        if (currentTimer) {
            let duration = remainingTime > 0 ? remainingTime : currentTimer.getAttribute("data-duration") * 60000;
            startTimer(currentTimer, duration);
            document.getElementById("timer-message").style.display = "none";
            document.getElementById("start").innerHTML = "Pause";
            pause_play_state = 'pause';
        } else {
            document.getElementById("timer-message").style.display = "block";
            document.getElementById("reset-message").style.display = "none";
        }
    } else {
        if (currentTimer) {
            clearInterval(myInterval);
            document.getElementById("start").innerHTML = "Start";
            pause_play_state = 'play';
        }
    }
});
