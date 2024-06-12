let Reset_btn = document.querySelector('#reset');

function resetTimer() {
    if (currentTimer == pomodoro) {
        let New_timer =
            prompt('Please set your Pomodoro timer(Note: in minutes):', '25');
        if (New_timer == null || New_timer <= 0) {
            alert('You did not reset your Pomodoro Timer');
        }
        else {
            pomodoro.setAttribute('data-duration', `${New_timer}.00`)
            pomodoro.innerHTML = `${New_timer}:00`;
        }
        document.getElementById("reset-message").style.display = "none";

    }
    else if (currentTimer == short) {
        let New_timer =
            prompt('Please set your short break timer(Note: in minutes):', '5');
        if (New_timer == null || New_timer <= 0) {
            alert('You did not reset your Short Break Timer');
        }
        else {
            short.setAttribute('data-duration', `${New_timer}.00`)
            short.innerHTML = `${New_timer}:00`;
        }
        document.getElementById("reset-message").style.display = "none";
    }
    else if (currentTimer == long) {
        let New_timer =
            prompt('Please set your long break timer(Note: in minutes):', '10');
        if (New_timer == null || New_timer <= 0) {
            alert('You did not reset your Long Break Timer');
        }
        else {
            long.setAttribute('data-duration', `${New_timer}.00`)
            long.innerHTML = `${New_timer}:00`;
        }
        document.getElementById("reset-message").style.display = "none";
    }
    else {
        document.getElementById("reset-message").style.display = "block";
        document.getElementById("timer-message").style.display = "none";
    }
}

Reset_btn.addEventListener('click', resetTimer);