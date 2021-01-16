/* State */
const exchangeApi =
  'https://v6.exchangerate-api.com/v6/aaa3027db922decf50ea9c44/latest';
const currencies = [
  { name: 'United States dollar', code: 'USD' },
  { name: 'Euro', code: 'EUR' },
  { name: 'Japanese yen', code: 'JPY' },
  { name: 'Pound sterling', code: 'GBP' },
  { name: 'Australian dollar', code: 'AUD' },
  { name: 'Canadian dollar', code: 'CAD' },
  { name: 'Swiss franc', code: 'CHF' },
  { name: 'Renminbi', code: 'CNY' },
  { name: 'Hong Kong dollar', code: 'HKD' },
  { name: 'New Zealand dollar', code: 'NZD' },
  { name: 'Swedish krona', code: 'SEK' },
  { name: 'South Korean won', code: 'KRW' },
  { name: 'Singapore dollar', code: 'SGD' },
  { name: 'Norwegian krone', code: 'NOK' },
  { name: 'Mexican peso', code: 'MXN' },
  { name: 'Indian rupee', code: 'INR' },
  { name: 'Russian ruble', code: 'RUB' },
  { name: 'South African rand', code: 'ZAR' },
  { name: 'Turkish lira', code: 'TRY' },
  { name: 'Brazilian real', code: 'BRL' },
  { name: 'New Taiwan dollar', code: 'TWD' },
  { name: 'Danish krone', code: 'DKK' },
  { name: 'Polish złoty', code: 'PLN' },
  { name: 'Thai baht', code: 'THB' },
  { name: 'Indonesian rupiah', code: 'IDR' },
  { name: 'Hungarian forint', code: 'HUF' },
  { name: 'Czech koruna', code: 'CZK' },
  { name: 'Israeli new shekel', code: 'ILS' },
  { name: 'Chilean peso', code: 'CLP' },
  { name: 'Philippine peso', code: 'PHP' },
  { name: 'UAE dirham', code: 'AED' },
  { name: 'Colombian peso', code: 'COP' },
  { name: 'Saudi riyal', code: 'SAR' },
  { name: 'Malaysian ringgit', code: 'MYR' },
  { name: 'Romanian leu', code: 'RON' },
];

/* DOM */
const userInput = document.getElementById('userInput');
const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const exchangeBtn = document.getElementById('exchange');
const resultDOM = document.getElementById('result-text');
const infoFrom = document.querySelector('.info-from');
const infoTo = document.querySelector('.info-to');

function renderCurrencies(currencyArray, domElement) {
  for (let currency of currencyArray) {
    const currencyOption = document.createElement('option');
    currencyOption.value = currency.code;
    currencyOption.textContent = currency.name;
    domElement.appendChild(currencyOption);
  }
}
renderCurrencies(currencies, fromCurrency);
renderCurrencies(currencies, toCurrency);

function exchange() {
  const userInputValue = Number(userInput.value);

  // check if the user input is a valid number, return if it is not.
  if (Number.isNaN(userInputValue)) {
    return;
  }

  // Get the value of the selected currency
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  // Get the text content of the selected currencies
  const selectedFromCurrency =
    fromCurrency.options[fromCurrency.selectedIndex].textContent;
  const selectedToCurrency =
    toCurrency.options[toCurrency.selectedIndex].textContent;

  // Only fetch the exchange rate if the currencies are different
  if (fromCurrencyValue !== toCurrencyValue) {
    fetch(`${exchangeApi}/${fromCurrencyValue}`)
      .then((response) => response.json())
      .then((exchange) => {
        if (exchange.result === 'success') {
          const conversionRates = exchange.conversion_rates;
          const exchangeResult =
            userInputValue * conversionRates[toCurrencyValue];
          resultDOM.textContent = `${userInputValue} ${fromCurrencyValue} = ${exchangeResult} ${toCurrencyValue}`;
          infoFrom.textContent = `1 ${selectedFromCurrency} equals`;
          infoTo.textContent = `${conversionRates[toCurrencyValue]} ${selectedToCurrency}`;
        } else {
          resultDOM.textContent =
            "Sorry, we're unable to fetch the conversion rates.";
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  } else {
    resultDOM.textContent = `${userInputValue} ${fromCurrencyValue} = ${userInputValue} ${toCurrencyValue}`;
    infoFrom.textContent = `1 ${selectedFromCurrency} equals`;
    infoTo.textContent = `1 ${selectedToCurrency}`;
  }
}

exchangeBtn.addEventListener('click', exchange);
