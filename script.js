const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");
const themeToggle = document.getElementById("themeToggle");

// Click sound
const clickSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3");

// Load saved history
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
renderHistory();

// Button clicks
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    clickSound.play();
    handleInput(btn.textContent);
  });
});

function handleInput(value) {
  if (value === "C") clearDisplay();
  else if (value === "DEL") deleteLast();
  else if (value === "=") calculate();
  else appendValue(value);
}

function appendValue(val) {
  display.value = display.value === "0" ? val : display.value + val;
}

function clearDisplay() {
  display.value = "0";
}

function deleteLast() {
  display.value = display.value.slice(0, -1) || "0";
}

function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression);
    display.value = result;
    saveHistory(`${expression} = ${result}`);
  } catch {
    display.value = "Error";
  }
}

// Save calculation history
function saveHistory(entry) {
  history.unshift(entry);
  history = history.slice(0, 10);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
}

// Render history
function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Clear history
clearHistoryBtn.onclick = () => {
  history = [];
  localStorage.removeItem("calcHistory");
  renderHistory();
};

// Theme toggle
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  themeToggle.textContent =
    document.body.classList.contains("light") ? "🌞" : "🌙";
};
