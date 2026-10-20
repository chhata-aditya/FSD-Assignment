/**
 * Minimalist Calculator Engine
 * Author: Chhata
 * Elegant arithmetic dispatch, memory, and smooth keypad controller
 */

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Error" : a / b);

function compute(firstVal, op, secondVal) {
  switch (op) {
    case "+": return add(firstVal, secondVal);
    case "-": return subtract(firstVal, secondVal);
    case "*": return multiply(firstVal, secondVal);
    case "/": return divide(firstVal, secondVal);
    default: return "Error";
  }
}

// State variables
let currentScreenValue = "0";
let storedOperand = null;
let currentOperator = null;
let shouldClearScreenOnNextDigit = false;

const screenEl = document.getElementById("display");
const historyEl = document.getElementById("history");
const operatorIcons = { "+": "+", "-": "−", "*": "×", "/": "÷" };

function updateDisplay() {
  screenEl.textContent = currentScreenValue;
}

function formatResult(val) {
  if (val === "Error") return "Error";
  return String(Math.round(val * 1e10) / 1e10);
}

function resetCalculator() {
  currentScreenValue = "0";
  storedOperand = null;
  currentOperator = null;
  shouldClearScreenOnNextDigit = false;
  historyEl.textContent = "";
  updateDisplay();
}

function handleDigit(digit) {
  if (currentScreenValue === "Error") currentScreenValue = "0";

  if (shouldClearScreenOnNextDigit) {
    currentScreenValue = digit;
    shouldClearScreenOnNextDigit = false;
  } else {
    currentScreenValue = currentScreenValue === "0" ? digit : currentScreenValue + digit;
  }
  updateDisplay();
}

function handleDecimal() {
  if (currentScreenValue === "Error") currentScreenValue = "0";

  if (shouldClearScreenOnNextDigit) {
    currentScreenValue = "0.";
    shouldClearScreenOnNextDigit = false;
  } else if (!currentScreenValue.includes(".")) {
    currentScreenValue += ".";
  }
  updateDisplay();
}

function handleOperator(op) {
  if (currentScreenValue === "Error") return;
  const numVal = parseFloat(currentScreenValue);

  if (currentOperator !== null && !shouldClearScreenOnNextDigit) {
    const res = compute(storedOperand, currentOperator, numVal);
    if (res === "Error") {
      currentScreenValue = "Error";
      storedOperand = null;
      currentOperator = null;
      shouldClearScreenOnNextDigit = true;
      historyEl.textContent = "";
      updateDisplay();
      return;
    }
    storedOperand = res;
    currentScreenValue = formatResult(res);
  } else {
    storedOperand = numVal;
  }

  currentOperator = op;
  shouldClearScreenOnNextDigit = true;
  historyEl.textContent = `${formatResult(storedOperand)} ${operatorIcons[op]}`;
  updateDisplay();
}

function handleEqual() {
  if (currentOperator === null || shouldClearScreenOnNextDigit) return;
  const numVal = parseFloat(currentScreenValue);
  const result = compute(storedOperand, currentOperator, numVal);

  if (result === "Error") {
    currentScreenValue = "Error";
    storedOperand = null;
    currentOperator = null;
    shouldClearScreenOnNextDigit = true;
    historyEl.textContent = "";
    updateDisplay();
    return;
  }

  historyEl.textContent = `${formatResult(storedOperand)} ${operatorIcons[currentOperator]} ${formatResult(numVal)} =`;
  currentScreenValue = formatResult(result);
  storedOperand = null;
  currentOperator = null;
  shouldClearScreenOnNextDigit = true;
  updateDisplay();
}

function handleBackspace() {
  if (currentScreenValue === "Error" || shouldClearScreenOnNextDigit) {
    resetCalculator();
    return;
  }
  currentScreenValue = currentScreenValue.length > 1 ? currentScreenValue.slice(0, -1) : "0";
  updateDisplay();
}

// Click listener
document.getElementById("keys").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.digit) handleDigit(btn.dataset.digit);
  else if (btn.dataset.op) handleOperator(btn.dataset.op);
  else if (btn.dataset.action === "equals") handleEqual();
  else if (btn.dataset.action === "clear") resetCalculator();
  else if (btn.dataset.action === "back") handleBackspace();
  else if (btn.dataset.action === "dot") handleDecimal();
});

// Keyboard listener
window.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") handleDigit(e.key);
  else if (["+", "-", "*", "/"].includes(e.key)) handleOperator(e.key);
  else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); handleEqual(); }
  else if (e.key === "Backspace") handleBackspace();
  else if (e.key === "Escape") resetCalculator();
  else if (e.key === ".") handleDecimal();
});
