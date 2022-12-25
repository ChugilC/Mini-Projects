const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

const TOKEN = config.KEY;

// Fetch exchange rates and update the DOM
const calculate = () => {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  const amount_one = amountEl_one.value;

  const myHeaders = new Headers();
  myHeaders.append('apikey', TOKEN);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${currency_two}&from=${currency_one}&amount=${amount_one}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const rates = result.info.rate;
      rateEl.innerText = `1 ${currency_one} = ${rates} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rates).toFixed(2);
    })
    .catch((error) => console.log('error', error));
};

// Event listener
currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
