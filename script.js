// Elements
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const strengthText = document.getElementById("strengthText");
const darkModeBtn = document.getElementById("darkModeToggle");
const strengthBar = document.getElementById("strengthBar");

// Character sets
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+";

// Update length
lengthSlider.addEventListener("input", () => {
  lengthValue.innerText = lengthSlider.value;
});

// Strength checker
function checkStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 1) {
    strengthText.innerText = "Weak";
    strengthBar.style.width = "33%";
    strengthBar.style.background = "red";
  } else if (strength <= 3) {
    strengthText.innerText = "Medium";
    strengthBar.style.width = "66%";
    strengthBar.style.background = "orange";
  } else {
    strengthText.innerText = "Strong";
    strengthBar.style.width = "100%";
    strengthBar.style.background = "green";
  }
}

// Generate password
generateBtn.addEventListener("click", () => {
  let length = lengthSlider.value;
  let password = "";
  let selectedTypes = [];

  if (uppercaseCheck.checked) selectedTypes.push(upperChars);
  if (lowercaseCheck.checked) selectedTypes.push(lowerChars);
  if (numbersCheck.checked) selectedTypes.push(numberChars);
  if (symbolsCheck.checked) selectedTypes.push(symbolChars);

  if (selectedTypes.length === 0) {
    alert("Select at least one option!");
    return;
  }

  // Ensure at least one character from each
  selectedTypes.forEach((type) => {
    password += type[Math.floor(Math.random() * type.length)];
  });

  let allChars = selectedTypes.join("");

  for (let i = password.length; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  // Shuffle password
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  passwordInput.value = password;

  checkStrength(password);
});

// Copy
copyBtn.addEventListener("click", () => {
  if (!passwordInput.value) {
    alert("No password to copy!");
    return;
  }

  navigator.clipboard.writeText(passwordInput.value);
  alert("Copied!");
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Toggle + save
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
