// Timer
let totalSeconds;
let interval;
let isPaused = true;
let shortBreak = 300;
let longBreak = 900;
let pomodoroTime = 1500;
let focusButton = document.getElementById("focus");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let timeSelector = document.querySelector(".time_selectors");
let buttons = document.querySelectorAll(".time_selector_btn");
let start = document.getElementById("start");
let skip = document.getElementById("skip");
let pomodoroCount = 1;
//  todolist
let addTaskBtn = document.querySelector(".add_task");
let content = document.querySelector(".content");
let popup = document.querySelector(".popup");
const form = document.querySelector(".new_task_maker");

function startTimer(mode) {
  switch (mode) {
    case "pomodoroSet":
      totalSeconds = 1500;
      pauseTimer();
      clearInterval(interval);
      countDown();
      resetBtn();
      break;

    case "shortBreak":
      totalSeconds = 300;
      pauseTimer();
      clearInterval(interval);
      countDown();
      resetBtn();
      break;

    case "longBreak":
      totalSeconds = 900;
      pauseTimer();
      clearInterval(interval);
      countDown();
      resetBtn();
      break;
  }

  currentMode = mode;
}

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
  count.classList.remove("active");
};

function countDown() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const sec = seconds < 10 ? "0" + seconds : seconds;
  const min = minutes < 10 ? "0" + minutes : minutes;

  countdownDisplay.textContent = `${min} : ${sec}`;
  count.textContent = pomodoroCount + "/4";

  if (totalSeconds > 0) {
    totalSeconds--;
  } else if (currentMode === "pomodoroSet") {
    startTimer("shortBreak");
    removeFocus();
    shortBreakButton.classList.add("active");
    pomodoroCount++;

    if (pomodoroCount === 5) {
      pomodoroCount = 1;
      startTimer("longBreak");
      removeFocus();
      longBreakButton.classList.add("active");
    } else {
      startTimer("shortBreak");
      removeFocus();
      shortBreakButton.classList.add("active");
    }
  } else if (currentMode === "shortBreak") {
    startTimer("pomodoroSet");
    removeFocus();
    focusButton.classList.add("active");
    count.classList.add("active");
  } else if (currentMode === "longBreak") {
    startTimer("pomodoroSet");
    removeFocus();
    focusButton.classList.add("active");
    count.classList.add("active");
  }
}

function resumeTimer() {
  interval = setInterval(countDown, 1000);
  isPaused = false;
}
function pauseTimer() {
  clearInterval(interval);
  isPaused = true;
}

function longBreakLaunch() {
  startTimer("longBreak");
  removeFocus();
  longBreakButton.classList.add("active");
}

function resetBtn() {
  checkmark.style.background = "rgb(255, 215, 0)";
  checkmark.textContent = "Start";
}
start.addEventListener("click", (e) => {
  e.preventDefault();
  if (isPaused) {
    resumeTimer();
    checkmark.classList.add("active");
    checkmark.textContent = "Pause";
  } else {
    pauseTimer();
    resetBtn();
  }
});

skip.addEventListener("click", (e) => {
  e.preventDefault();
  removeFocus();
  focusButton.classList.add("active");
  count.classList.add("active");
  startTimer("pomodoroSet");
});

focusButton.addEventListener("click", () => {
  startTimer("pomodoroSet");
  removeFocus();
  focusButton.classList.add("active");
  count.classList.add("active");
});

shortBreakButton.addEventListener("click", () => {
  startTimer("shortBreak");
  removeFocus();
  shortBreakButton.classList.add("active");
});

longBreakButton.addEventListener("click", () => {
  startTimer("longBreak");
  removeFocus();
  longBreakButton.classList.add("active");
});

startTimer("pomodoroSet");

//___________
// ____________________TODOLIST___________________
//___________
addTaskBtn.addEventListener("click", () => {
  content.classList.add("darken");
  popup.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  content.classList.remove("darken");
  popup.classList.add("hidden");
});

//storage part
function storelist() {
  window.localStorage.todolist = list.innerHTML;
}

function getTodos() {
  if (window.localStorage.todoList) {
    list.innerHTML = window.localStorage.todoList;
  }
}
window.addEventListener("load", getTodos);

// Add element
form.addEventListener("submit", (e) => {
  e.preventDefault();

  list.innerHTML += `<li>${item.value}</li>`;
  storelist();
});
// constructor pour tasks