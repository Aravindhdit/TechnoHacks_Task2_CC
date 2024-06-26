// script.js
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '3a0dc7dba62ab0a672b0f255'; // Replace with your actual API key
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convertButton');
    const resultDiv = document.getElementById('result');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rates = data.conversion_rates;
            populateCurrencyOptions(rates);
        })
        .catch(error => console.error('Error fetching exchange rates:', error));

    function populateCurrencyOptions(rates) {
        const currencies = Object.keys(rates);
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrencySelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrencySelect.appendChild(option2);
        });

        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'EUR';
    }

    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount';
            return;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const rates = data.conversion_rates;
                const fromRate = rates[fromCurrency];
                const toRate = rates[toCurrency];
                const convertedAmount = (amount / fromRate) * toRate;
                resultDiv.textContent = `${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`;
            })
            .catch(error => console.error('Error fetching exchange rates:', error));
    });
});
