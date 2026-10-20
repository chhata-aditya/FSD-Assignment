/**
 * Creative Studio Registration Form
 * Author: Chhata
 * Real-time field evaluation, password entropy score, and graceful alerts
 */

const formValidators = {
  name(v) {
    const val = v.trim();
    if (!val) return "Please enter your name.";
    if (val.length < 3) return "Name must be at least 3 letters.";
    if (!/^[A-Za-z][A-Za-z .'-]*$/.test(val)) return "Please use alphabetical letters only.";
    return "";
  },

  email(v) {
    const val = v.trim();
    if (!val) return "Please provide an email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) return "Email format is invalid.";
    return "";
  },

  phone(v) {
    const val = v.trim();
    if (!val) return "Please provide a phone number.";
    if (!/^\d+$/.test(val)) return "Numbers only, please.";
    if (val.length !== 10) return "Phone number must be exactly 10 digits.";
    return "";
  },

  password(v) {
    if (!v) return "Please choose a secure password.";
    if (v.length < 8) return "Password must be at least 8 characters.";
    if (!/[a-z]/.test(v) || !/[A-Z]/.test(v)) return "Combine uppercase and lowercase letters.";
    if (!/\d/.test(v)) return "Add at least one numerical digit.";
    return "";
  }
};

const observedFields = ["name", "email", "phone", "password"];

function checkField(fieldName) {
  const inputEl = document.getElementById(fieldName);
  const msgEl = document.getElementById(`${fieldName}-msg`);
  const err = formValidators[fieldName](inputEl.value);

  msgEl.textContent = err;

  const isErr = err !== "";
  const isOk = err === "" && inputEl.value.trim() !== "";

  inputEl.classList.toggle("has-error", isErr);
  inputEl.classList.toggle("is-valid", isOk);

  return !isErr;
}

observedFields.forEach((fieldName) => {
  const inputEl = document.getElementById(fieldName);
  inputEl.addEventListener("blur", () => checkField(fieldName));
  inputEl.addEventListener("input", () => {
    if (inputEl.classList.contains("has-error")) checkField(fieldName);
  });
});

// Password strength indicator
const pwEl = document.getElementById("password");
const barEl = document.getElementById("strengthBar");

pwEl.addEventListener("input", () => {
  const text = pwEl.value;
  let points = 0;
  if (text.length >= 8) points++;
  if (/[a-z]/.test(text) && /[A-Z]/.test(text)) points++;
  if (/\d/.test(text)) points++;
  if (/[^A-Za-z0-9]/.test(text)) points++;

  const colors = ["transparent", "#e06c75", "#e5c07b", "#88b988", "#5d835d"];
  barEl.style.width = `${points * 25}%`;
  barEl.style.background = colors[points];
});

// Show / Hide password
const toggleBtn = document.getElementById("togglePw");
toggleBtn.addEventListener("click", () => {
  const isSecret = pwEl.type === "password";
  pwEl.type = isSecret ? "text" : "password";
  toggleBtn.textContent = isSecret ? "Hide" : "Show";
});

// Form submit
const signupForm = document.getElementById("signup");
const feedbackAlert = document.getElementById("result");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  observedFields.forEach((f) => {
    if (!checkField(f)) isValid = false;
  });

  if (isValid) {
    feedbackAlert.className = "alert-box success";
    feedbackAlert.textContent = "Welcome to the studio, Chhata! Account created.";
    signupForm.reset();
    barEl.style.width = "0";

    observedFields.forEach((f) => {
      document.getElementById(f).classList.remove("is-valid");
    });

    setTimeout(() => {
      feedbackAlert.textContent = "";
      feedbackAlert.className = "alert-box";
    }, 5000);
  } else {
    feedbackAlert.textContent = "";
    feedbackAlert.className = "alert-box";
  }
});
