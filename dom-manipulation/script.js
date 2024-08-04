// Initialize an array to store quote objects
let quotes = [];

// Simulated server URL (replace with actual server URL in a real application)
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        quotes = [
            { id: 1, text: "Be the change you wish to see in the world.", category: "Inspiration" },
            { id: 2, text: "Stay hungry, stay foolish.", category: "Motivation" },
            { id: 3, text: "The only way to do great work is to love what you do.", category: "Success" }
        ];
        saveQuotes();
    }
    updateCategoryFilter();
}

// Function to update category filter options
function updateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    const savedCategory = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = savedCategory;
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory);
    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        displayQuote(randomQuote);
    } else {
        document.getElementById('quoteDisplay').innerHTML = 'No quotes found for this category.';
    }
}

// Function to display a quote
function displayQuote(quote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `"${quote.text}" - ${quote.category}`;
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();
    if (text && category) {
        const newQuote = { id: Date.now(), text, category };
        quotes.push(newQuote);
        saveQuotes();
        updateCategoryFilter();
        newQuoteText.value = '';
        newQuoteCategory.value = '';
        filterQuotes();
        syncWithServer();
    } else {
        alert('Please enter both quote text and category.');
    }
}

// Function to export quotes to a JSON file
function exportQuotes() {
    const quotesJson = JSON.stringify(quotes, null, 2);
    const blob = new Blob([quotesJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importQuotes(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedQuotes = JSON.parse(e.target.result);
                quotes = importedQuotes;
                saveQuotes();
                updateCategoryFilter();
                filterQuotes();
                syncWithServer();
                alert('Quotes imported successfully!');
            } catch (error) {
                alert('Error importing quotes. Please make sure the file is valid JSON.');
            }
        };
        reader.readAsText(file);
    }
}

// Function to sync quotes with the server
async function syncWithServer() {
    try {
        const response = await fetch(SERVER_URL);
        const serverQuotes = await response.json();
        serverQuotes.forEach(serverQuote => {
            const localQuote = quotes.find(q => q.id === serverQuote.id);
            if (localQuote) {
                Object.assign(localQuote, serverQuote);
            } else {
                quotes.push(serverQuote);
            }
        });
        const localOnlyQuotes = quotes.filter(q => !serverQuotes.some(sq => sq.id === q.id));
        for (const quote of localOnlyQuotes) {
            await postQuoteToServer(quote);
        }
        saveQuotes();
        updateCategoryFilter();
        filterQuotes();
        updateSyncStatus('Sync completed successfully');
    } catch (error) {
        console.error('Sync failed:', error);
        updateSyncStatus('Sync failed. Please try again later.');
    }
}

// Function to post a quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quote),
        });
        const data = await response.json();
        quote.id = data.id;
    } catch (error) {
        console.error('Failed to post quote to server:', error);
    }
}

// Function to update sync status
function updateSyncStatus(message) {
    const syncStatus = document.getElementById('syncStatus');
    syncStatus.textContent = message;
    setTimeout(() => {
        syncStatus.textContent = '';
    }, 3000);
}

// Add event listeners
document.getElementById('newQuote').addEventListener('click', filterQuotes);
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
document.getElementById('exportBtn').addEventListener('click', exportQuotes);
document.getElementById('importFile').addEventListener('change', importQuotes);
document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

// Load quotes from local storage, update category filter, and show a filtered quote when the page loads
loadQuotes();
filterQuotes();

// Set up periodic syncing (every 5 minutes)
setInterval(syncWithServer, 5 * 60 * 1000);
