const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransaction = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

// Remove transaction
const removeTransaction = (id) => {
  transactions = transactions.filter((item) => item.id != id);
  updateLocalStorage();
  init();
};

// Generate random ID
const generateID = () => {
  return Math.floor(Math.random() * 100000);
};

// Add transaction
const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
};

// Add transaction to DOM
const addTransactionDOM = (transaction) => {
  // Get the sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // Add class based on sign
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button onclick="removeTransaction(${
    transaction.id
  })" class="delete-btn">X</button>`;

  list.appendChild(item);
};

// Calculate the total balance, income and expense
const updateValues = () => {
  const amounts = transactions.map((transaction) => {
    return transaction.amount;
  });

  const total = amounts.reduce((acc, num) => acc + num, 0).toFixed(2);

  const income = amounts
    .filter((num) => num > 0)
    .reduce((acc, num) => acc + num, 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, num) => acc + num, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
};

// Update local storage transaction
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

// Initialize
const init = () => {
  list.innerHTML = '';
  transactions.forEach((item) => {
    addTransactionDOM(item);
  });

  updateValues();
};

init();

form.addEventListener('submit', addTransaction);
