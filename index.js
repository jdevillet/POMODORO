let totalSeconds;
let interval;
let isPaused = true;
const shortBreak = 300;
const longBreak = 900;
const pomodoroTime = 1500;
const timeSelector = document.querySelector(".time_selector");
const start = document.getElementById("start");
const skip = document.getElementById("skip");
let mode = "pomodoroSet";
let pomodoroCount = 0;

function startTimer(mode) {
  switch (mode) {
    case "pomodoroSet":
      totalSeconds = pomodoroTime;
      break;

    case "shortBreak":
      totalSeconds = shortBreak;
      break;

    case "longBreak":
      totalSeconds = longBreak;
      break;

    default:
      totalSeconds = pomodoroTime;
      break;
  }
}

// ...

// ...

function countDown() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const sec = seconds < 10 ? "0" + seconds : seconds;
  const min = minutes < 10 ? "0" + minutes : minutes;

  countdownDisplay.textContent = `${min} : ${sec}`;
  if (totalSeconds > 0) {
    totalSeconds--;
  } else if (mode === "pomodoroSet") {
    // Le chronomètre Pomodoro est terminé, passez à la courte pause
    startTimer("shortBreak");
    countDown();
    resetBtn();
    sB.checked = true;
    pomodoro.checked = false;
    clearInterval(interval);
    // Ajoutez ici une notification pour informer l'utilisateur
    console.log("Pomodoro terminé !");
  } else if (mode === "shortBreak") {
    // La courte pause est terminée, passez au prochain Pomodoro
    startTimer("pomodoroSet");
    countDown();
    resetBtn();
    pomodoro.checked = true;
    sB.checked = false;
    clearInterval(interval);
    // Ajoutez ici une notification pour informer l'utilisateur
    console.log("Courte pause terminée !");
  } else if (mode === "longBreak") {
    // La longue pause est terminée, passez au prochain Pomodoro
    startTimer("pomodoroSet");
    countDown();
    resetBtn();
    mode = "pomodoroSet"; // Mettez à jour le mode
    clearInterval(interval);
    // Ajoutez ici une notification pour informer l'utilisateur
    console.log("Longue pause terminée !");
  }
}

// ...

function resumeTimer() {
  //todo/?////////////////////////////////////////////////////////////////////////////////////////////////
  interval = setInterval(countDown, 2);
  isPaused = false;
}
function pauseTimer() {
  clearInterval(interval);
  isPaused = true;
}

function resetBtn() {
  checkmark.style.background = "rgb(255, 215, 0)";
  checkmark.textContent = "Start";
}
start.addEventListener("click", (e) => {
  e.preventDefault();
  if (isPaused) {
    resumeTimer();
    checkmark.style.background = "rgb(128, 98, 0)";
    checkmark.textContent = "Pause";
  } else {
    pauseTimer();
    resetBtn();
  }
});

skip.addEventListener("click", (e) => {
  e.preventDefault();
  startTimer("pomodoroSet");
  countDown();
  clearInterval(interval);
  resetBtn();
  pomodoro.checked = true;
});

document.getElementById("pomodoro").addEventListener("click", () => {
  startTimer("pomodoroSet");
  clearInterval(interval);
  resetBtn();
  pauseTimer();
  countDown();
});

document.getElementById("sB").addEventListener("click", () => {
  startTimer("shortBreak");
  clearInterval(interval);
  resetBtn();
  pauseTimer();
  countDown();
});

document.getElementById("lB").addEventListener("click", () => {
  startTimer("longBreak");
  clearInterval(interval);
  resetBtn();
  pauseTimer();
  countDown();
});

startTimer("pomodoroSet");
countDown();
