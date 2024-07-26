// script.js  
let quotes = [  
   { text: "Believe you can and you're halfway there.", category: "Inspirational" },  
   { text: "The only way to do great work is to love what you do.", category: "Motivational" },  
   { text: "Be the change you wish to see in the world.", category: "Inspirational" },  
   // Add more quotes here...  
];  
  
// Function to display a random quote  
function showRandomQuote() {  
   const randomIndex = Math.floor(Math.random() * quotes.length);  
   const randomQuote = quotes[randomIndex];  
   const quoteDisplay = document.getElementById("quoteDisplay");  
   quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;  
}  
  
// Function to create the add quote form  
function createAddQuoteForm() {  
   const quoteForm = document.getElementById("quoteForm");  
   const newQuoteText = document.getElementById("newQuoteText");  
   const newQuoteCategory = document.getElementById("newQuoteCategory");  
   const addQuoteButton = document.getElementById("addQuote");  
   const categorySelect = document.getElementById("categorySelect");  
  
   // Populate categories in the select element  
   const categories = [...new Set(quotes.map(quote => quote.category))];  
   categories.forEach(category => {  
      const option = document.createElement("option");  
      option.text = category;  
      option.value = category;  
      categorySelect.appendChild(option);  
   });  
  
   // Add event listener to the "Add Quote" button  
   addQuoteButton.addEventListener("click", () => {  
      const newQuote = {  
        text: newQuoteText.value,  
        category: newQuoteCategory.value  
      };  
      quotes.push(newQuote);  
      newQuoteText.value = "";  
      newQuoteCategory.value = "";  
      showRandomQuote();  
   });  
}  
  
// Initialize the app  
showRandomQuote();  
createAddQuoteForm();  
  
// Add event listener to the "Show New Quote" button  
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
