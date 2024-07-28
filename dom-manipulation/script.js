// Array of quote objects (loaded from local storage initially)
let quotes = [];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Function to add a new quote
function addNewQuote() {
  const quoteText = document.getElementById("quoteText").value;
  const quoteCategory = document.getElementById("quoteCategory").value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    document.getElementById("quoteText").value = "";
    document.getElementById("quoteCategory").value = "";
    saveQuotes(); // Save quotes to local storage
    alert("Quote added successfully!");
  } else {
    alert("Please fill out both fields.");
  }
}

// Function to create the add quote form dynamically
function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");

  const form = document.createElement("div");
  form.id = "quoteForm";

  const quoteTextInput = document.createElement("input");
  quoteTextInput.type = "text";
  quoteTextInput.id = "quoteText";
  quoteTextInput.placeholder = "Quote Text";

  const quoteCategoryInput = document.createElement("input");
  quoteCategoryInput.type = "text";
  quoteCategoryInput.id = "quoteCategory";
  quoteCategoryInput.placeholder = "Quote Category";

  const addQuoteButton = document.createElement("button");
  addQuoteButton.id = "addQuote";
  addQuoteButton.textContent = "Add Quote";

  form.appendChild(quoteTextInput);
  form.appendChild(quoteCategoryInput);
  form.appendChild(addQuoteButton);

  formContainer.appendChild(form);

  // Event listener for the add quote button
  addQuoteButton.addEventListener("click", addNewQuote);
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to load quotes from local storage (called on initialization)
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Function to export quotes to a JSON file
function exportQuotesToJson() {
  const jsonData = JSON.stringify(quotes);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  link.click();
  URL.revokeObjectURL(url); // Revoke temporary URL after download
}

// Function to import quotes from a JSON file
function importFromJsonFile
