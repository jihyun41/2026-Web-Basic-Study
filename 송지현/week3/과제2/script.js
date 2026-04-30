
const languageSelect = document.getElementById("language");
const getFactBtn = document.getElementById("getFactBtn");
const getMultipleBtn = document.getElementById("getMultipleBtn");
const factCount = document.getElementById("factCount");
const factContainer = document.getElementById("factContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const API_URL = "https://meowfacts.herokuapp.com";


function showLoading() {
  loading.classList.remove("hidden"); 
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError(message) {
  error.textContent = message; 
  error.classList.remove("hidden");
  setTimeout(() => error.classList.add("hidden"), 3000); 
}

function displayFacts(facts) {
  factContainer.innerHTML = ""; 

  const factsArray = Array.isArray(facts) ? facts : [facts];

  factsArray.forEach((fact, index) => {
    const factCard = document.createElement("div");
    factCard.className = "fact-card";

    if (factsArray.length > 1) {
      factCard.textContent = `${index + 1}. ${fact}`;
    } else {
      factCard.textContent = fact;
    }

    factContainer.appendChild(factCard);
  });
}

async function fetchFacts(count = 1) {
  
  const language = languageSelect.value;
  
  const url = `${API_URL}?count=${count}&lang=${language}`;

  try {
  
    showLoading();
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch cat facts");
    const data = await response.json();
    return data.data;
  } catch (err) {
    showError("Failed to fetch cat facts");
  } finally {
    hideLoading();
  }
}

getFactBtn.addEventListener("click", async () => {
  const facts = await fetchFacts();
  if(Array.isArray(facts[0]) || facts[0].length > 0) {
    displayFacts(facts[0]);
  }
});

getMultipleBtn.addEventListener("click", async () => {
  const count = parseInt(factCount.value) || 1;

  if (count < 1 || count > 5) {
    showError("Please enter a number between 1 and 5");
    return;
  }
  const facts = await fetchFacts(count);
  displayFacts(facts);
});

window.addEventListener("load", () => {
  getFactBtn.click();
});
