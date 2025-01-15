
const videoModal = document.getElementById('miniModal');
const video = document.getElementById('myVideo');
const closeModal = document.getElementById('closeModal');

videoModal.addEventListener('click', function() {
    video.style.display = 'block';
    videoModal.style.display = 'none';
    closeModal.style.display = 'block';
});

closeModal.addEventListener('click', function() {
    video.style.display = 'none';
    videoModal.style.display = 'block';
    closeModal.style.display = 'none';
});


// Data for the bull runs
const data = {
    bullRun2017: [
        { purchaseDate: 'Monday, October 5, 2015', btcBuyPrice: 240, sellDate: 'Monday, December 18, 2017', btcSellPrice: 19140 },
        { purchaseDate: 'Monday, February 15, 2016', btcBuyPrice: 407, sellDate: 'Monday, December 18, 2017', btcSellPrice: 19140 },
        { purchaseDate: 'Monday, September 5, 2016', btcBuyPrice: 608, sellDate: 'Monday, December 18, 2017', btcSellPrice: 19140 },
        { purchaseDate: 'Monday, February 6, 2017', btcBuyPrice: 1008, sellDate: 'Monday, December 18, 2017', btcSellPrice: 19140 },
        { purchaseDate: 'Monday, April 10, 2017', btcBuyPrice: 1208, sellDate: 'Monday, December 18, 2017', btcSellPrice: 19140 },
        { purchaseDate: 'Monday, August 7, 2017', btcBuyPrice: 3186, sellDate: 'Monday, December 18, 2017', btcSellPrice: 19140 },
        { purchaseDate: 'Monday, October 2, 2017', btcBuyPrice: 4385, sellDate: 'Monday, December 18, 2017', btcSellPrice: 19140 }
    ],
    bullRun2021: [
        { purchaseDate: 'Monday, February 11, 2019', btcBuyPrice: 3648, sellDate: 'Monday, April 12, 2021', btcSellPrice: 60000 },
        { purchaseDate: 'Monday, January 13, 2020 (COVID)', btcBuyPrice: 8029, sellDate: 'Monday, January 13, 2020', btcSellPrice: 8029 },
        { purchaseDate: 'Monday, May 4, 2020', btcBuyPrice: 8968, sellDate: 'Monday, April 12, 2021', btcSellPrice: 60000 },
        { purchaseDate: 'Monday, October 12, 2020', btcBuyPrice: 11375, sellDate: 'Monday, April 12, 2021', btcSellPrice: 60000 }
    ],
    bullRun2025: [
        { purchaseDate: 'Monday, January 16, 2023', btcBuyPrice: 20877, sellDate: 'Monday, September 1, 2025', btcSellPrice: 150000 },
        { purchaseDate: 'Monday, June 26, 2023', btcBuyPrice: 30280, sellDate: 'Monday, September 1, 2025', btcSellPrice: 150000 },
        { purchaseDate: 'Monday, October 2, 2023', btcBuyPrice: 28037, sellDate: 'Monday, September 1, 2025', btcSellPrice: 150000 },
        { purchaseDate: 'Monday, February 12, 2024', btcBuyPrice: 40823, sellDate: 'Monday, September 1, 2025', btcSellPrice: 150000 },
        { purchaseDate: 'Monday, September 23, 2024', btcBuyPrice: 63600, sellDate: 'Monday, September 1, 2025', btcSellPrice: 150000 }
    ]
};

// Format numbers as currency
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

// Update bull run data table and calculate total profit and percentage
function updateBullRunData(bullRunData, spendAmount, leverage, tableId, totalProfitId, percentageProfitId) {
    const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    let totalProfit = 0; // Initialize total profit
    let totalSpendAmount = 0; // Initialize total spend amount
    tableBody.innerHTML = ''; // Clear previous table data

    bullRunData.forEach(item => {
        const totalSpendAmt = spendAmount * leverage; // Total spend per entry
        const btcBuyQty = totalSpendAmt / item.btcBuyPrice; // BTC quantity purchased
        const totalBtcSell = btcBuyQty * item.btcSellPrice; // Total BTC sell amount
        const profit = totalBtcSell - totalSpendAmt; // Profit calculation

        totalProfit += profit; // Accumulate total profit
        totalSpendAmount += totalSpendAmt; // Accumulate total spend amount

        // Create table row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.purchaseDate}</td>
            <td>${formatCurrency(item.btcBuyPrice)}</td>
            <td>${formatCurrency(spendAmount)}</td>
            <td>${leverage}</td>
            <td>${formatCurrency(totalSpendAmt)}</td>
            <td>${btcBuyQty.toFixed(3)}</td>
            <td>${item.sellDate}</td>
            <td>${formatCurrency(item.btcSellPrice)}</td>
            <td>${btcBuyQty.toFixed(3)}</td>
            <td>${formatCurrency(totalBtcSell)}</td>
            <td>${formatCurrency(profit)}</td>
        `;
        tableBody.appendChild(row);
    });


    // Update total profit and percentage in the DOM
    document.getElementById(totalProfitId).textContent = `Total Profit: ${formatCurrency(totalProfit)}`;
}

// Update data based on user input
function updateData() {
    const spendAmount = parseFloat(document.getElementById('spendAmount').value) || 0;
    const leverage = parseFloat(document.getElementById('leverage').value) || 1;
    const btcSellPrice = parseFloat(document.getElementById('currentAmount').value) || 0;

    // Dynamically set sell prices for the 2025 bull run
    data.bullRun2025.forEach(item => {
        item.btcSellPrice = btcSellPrice; // Update sell price with user input
    });

    updateBullRunData(data.bullRun2017, spendAmount, leverage, 'bullRun2017', 'totalProfit2017', 'percentageProfit2017');
    updateBullRunData(data.bullRun2021, spendAmount, leverage, 'bullRun2021', 'totalProfit2021', 'percentageProfit2021');
    updateBullRunData(data.bullRun2025, spendAmount, leverage, 'bullRun2025', 'totalProfit2025', 'percentageProfit2025');
}
// Function to handle modal display
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal .close');

    // Add event listener to purchase dates
    document.querySelectorAll('td:first-child').forEach(cell => {
        cell.addEventListener('click', () => {
            const purchaseDate = cell.textContent.trim();

            // Update modal image src (replace 'path/to/images/' with your actual image path)
            modalImage.src = purchaseDateImages[purchaseDate];
            modal.style.display = 'block';
                        

            // Show the modal
            modal.style.display = 'block';
        });
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal on outside click
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});


// Initialize the data
updateData();

// Add event listeners for inputs
document.getElementById('spendAmount').addEventListener('input', updateData);
document.getElementById('leverage').addEventListener('input', updateData);

// Map of purchase dates to corresponding image file names
const purchaseDateImages = {
    "Monday, October 5, 2015": "images/october_5_2015.jpg",
    "Monday, February 15, 2016": "images/february_15_2016.jpg",
    "Monday, September 5, 2016": "images/september_5_2016.jpg",
    "Monday, February 6, 2017": "images/february_6_2017.jpg",
    "Monday, April 10, 2017": "images/april_10_2017.jpg",
    "Monday, August 7, 2017": "images/august_7_2017.jpg",
    "Monday, October 2, 2017": "images/october_2_2017.jpg",
    "Monday, February 11, 2019": "images/february_11_2019.jpg",
    "Monday, January 13, 2020 (COVID)": "images/january_13_2020_covid.jpg",
    "Monday, May 4, 2020": "images/may_4_2020.jpg",
    "Monday, October 12, 2020": "images/october_12_2020.jpg",
    "Monday, January 16, 2023": "images/january_16_2023.jpg",
    "Monday, June 26, 2023": "images/june_26_2023.jpg",
    "Monday, October 2, 2023": "images/october_2_2023.jpg",
    "Monday, February 12, 2024": "images/february_12_2024.jpg",
    "Monday, September 23, 2024": "images/september_23_2024.jpg"
};


// Function to handle modal display
function initializeModalListeners() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal .close');

    // Remove existing event listeners to prevent duplication
    document.querySelectorAll('td:first-child').forEach(cell => {
        cell.replaceWith(cell.cloneNode(true)); // Replace with a clone to remove old listeners
    });

    // Add event listener to purchase dates
    document.querySelectorAll('td:first-child').forEach(cell => {
        cell.addEventListener('click', () => {
            const purchaseDate = cell.textContent.trim();

            // Check if an image is mapped to the purchase date
            if (purchaseDateImages[purchaseDate]) {
                modalImage.src = purchaseDateImages[purchaseDate];
                modal.style.display = 'block';
            } else {
                alert("No image available for this purchase date.");
            }
        });
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal on outside click
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Wrap the original updateData function to include re-initialization
const originalUpdateData = updateData;
updateData = function () {
    originalUpdateData(); // Call the original function
    initializeModalListeners(); // Reinitialize modal listeners for updated rows
};

// Initialize modal listeners on page load
document.addEventListener('DOMContentLoaded', initializeModalListeners);
