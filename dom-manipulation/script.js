const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const addQuoteBtn = document.getElementById('addQuoteBtn');

let quotes = [
  { text: 'Quote 1', category: 'Category 1' },
  { text: 'Quote 2', category: 'Category 2' },
  // ... more quotes
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = randomQuote.text;   

}

function addQuote() {
  const newQuote = {
    text: newQuoteText.value,
    category: newQuoteCategory.value
  };
  quotes.push(newQuote);
  newQuoteText.value = '';
  newQuoteCategory.value = '';
}

newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);

showRandomQuote(); // Show an initial quote
