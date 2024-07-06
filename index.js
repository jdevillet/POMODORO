// Timer
const progressBar = document.getElementById("myBar");
let progress;
let currentTime = 0;
let intervalBar;
let totalSeconds;
let totalTime;
let interval;
let isPaused = true;
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
let todoTask = document.getElementById("task");
let form = document.querySelector(".new_task_maker");
let deleteTask = document.getElementById("deleteBtn");

//___________
//?____________________TIMER___________________
//___________
function startTimer(mode) {
  switch (mode) {
    case "pomodoroSet":
      totalSeconds = 1500;
      totalTime = 1500;
      pauseTimer();
      clearInterval(interval);
      resetProgressBar();
      countDown();
      resetBtn();
      break;

    case "shortBreak":
      totalSeconds = 300;
      totalTime = 300;
      pauseTimer();
      clearInterval(interval);
      resetProgressBar();
      countDown();
      resetBtn();
      break;

    case "longBreak":
      totalSeconds = 900;
      totalTime = 900;
      pauseTimer();
      clearInterval(interval);
      resetProgressBar();
      countDown();
      resetBtn();
      break;
  }

  currentMode = mode;
}

// RemoveFocus highlight the selected mode in yellow : Focus, Short Break, Long Break
const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
  count.classList.remove("active");
};

// countDown is the coutdown logic
function countDown() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const sec = seconds < 10 ? "0" + seconds : seconds;
  const min = minutes < 10 ? "0" + minutes : minutes;

  countdownDisplay.textContent = `${min} : ${sec}`;
  count.textContent = pomodoroCount + "/4";
  //Mode switcher when coutdown reach 0
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
//play/pause button + handle progressBar
function resumeTimer() {
  interval = setInterval(countDown, 1);
  isPaused = false;
}
function pauseTimer() {
  clearInterval(interval);
  isPaused = true;
  clearInterval(intervalBar);
}
//ProgressBar
function updateProgressBar() {
  progress = (currentTime / totalTime) * 100;
  progressBar.style.width = `${progress}%`;
  console.log(currentTime);
  console.log(totalTime);
}
function resetProgressBar() {
  progress = 0;
  currentTime = 0

  clearInterval(intervalBar);
  progressBar.style.width = `${progress}%`;
}

//resetBtn edit the Pause button to Start button
function resetBtn() {
  checkmark.style.background = "rgb(201, 24, 24)";
  checkmark.textContent = "Start";
}
//Start timer button logic
start.addEventListener("click", (e) => {
  e.preventDefault();
  if (isPaused) {
    resumeTimer();
    checkmark.classList.add("active");
    checkmark.textContent = "Pause";
    //progressbar
    clearInterval(intervalBar);
    intervalBar = setInterval(() => {
      currentTime++;
      updateProgressBar();
      if (currentTime >= totalTime) {
        clearInterval(intervalBar);
      }
    }, 1);
  } else {
    pauseTimer();
    resetBtn();
  }
});

//Skip timer button (just to the right of the start/pause btn)
skip.addEventListener("click", (e) => {
  e.preventDefault();
  removeFocus();
  focusButton.classList.add("active");
  count.classList.add("active");
  startTimer("pomodoroSet");
  resetProgressBar();
});

// buttons above the Timer display
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
//?____________________TODOLIST___________________
//___________
//Show the window to create a new task
addTaskBtn.addEventListener("click", () => {
  content.classList.add("darken");
  popup.classList.remove("hidden");
});
//Cancel the new task process (close the previous window)
cancelBtn.addEventListener("click", () => {
  content.classList.remove("darken");
  popup.classList.add("hidden");
});

//storage part
function storeList() {
  window.localStorage.todoList = list.innerHTML;
}

function getTodos() {
  if (window.localStorage.todoList) {
    list.innerHTML = window.localStorage.todoList;
  } else {
    list.innerHTML = ``;
  }
}
window.addEventListener("load", getTodos);

// Add element/task
form.addEventListener("submit", (e) => {
  e.preventDefault();

  list.innerHTML += `
<li class="task" id="task">
          <div class="checkbox" id="checkTask"></div>
          <span class="task_Name">${item.value}</span>
          <span class="How_Many_Pomo">0/${HowLong.value}</span>
          <button id="deleteBtn"><i class="fa-solid fa-xmark"></i></button>
        </li>`;
  item.value = "";
  storeList();
  popup.classList.add("hidden");
  content.classList.remove("darken");
});
//---------
//---------------------------
//Ajoute une nouvelle tache et ouvre la console, tu verras que Todotask est null, je pense que c'est parceque la task se charge trop tard/apres le dom et donc elle n'est pas reconnue(ne fais pas attention a remove element, je le coderai quand j'aurais resolu ce probleme sinon ca sert a rien)
//---------------------------
//----------

//remove element

console.log(todoTask);

// Check/Uncheck CHECKBOX
