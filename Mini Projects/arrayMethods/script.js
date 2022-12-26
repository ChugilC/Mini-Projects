const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const sortTwoBtn = document.getElementById('sort_two');
const calculateWealthBtn = document.getElementById('calculate_wealth');
let searchInput = document.getElementById('searchbox');

let data = [];

// Format number as money
const formatMoney = (number) => {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Update the DOm
const updateDOM = (providedData = data) => {
  // clear the main
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
};

// Add data to array
const addData = (obj) => {
  data.push(obj);

  updateDOM();
};

// Fetch random user and add money
const getRamdomUser = async () => {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

// Double money
const doubleMoney = () => {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
};

// Sort user by wealth descending
const sortByWealthD = () => {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
};

// sort by wealth ascending
const sortByWealthA = () => {
  data.sort((a, b) => a.money - b.money);
  updateDOM();
};

// Show Millionaries
const showMillionaries = () => {
  data = data.filter((user) => {
    return user.money > 1000000;
  });
  updateDOM();
};

// Calculate total wealth
const calculateWealth = () => {
  const wealth = data.reduce((acc, user) => {
    return acc + user.money;
  }, 0);

  // Check if wealth is already in DOM
  document.getElementById('totalWealth')
    ? document.getElementById('totalWealth').remove()
    : null;

  const wealthEl = document.createElement('div');
  wealthEl.setAttribute('id', 'totalWealth');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
};
// Filter users
let typingTimer;
let typeInterval = 500;

const liveSearch = () => {
  let persons = document.querySelectorAll('.person');
  let search_query = document.getElementById('searchbox').value;

  persons.forEach((item) => {
    if (item.innerText.toLowerCase().includes(search_query.toLowerCase())) {
      item.classList.remove('is-hidden');
    } else {
      item.classList.add('is-hidden');
    }
  });
};

// Event listeners
addUserBtn.addEventListener('click', getRamdomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByWealthD);
sortTwoBtn.addEventListener('click', sortByWealthA);
showMillionairesBtn.addEventListener('click', showMillionaries);
calculateWealthBtn.addEventListener('click', calculateWealth);

searchInput.addEventListener('keyup', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(liveSearch, typeInterval);
});

getRamdomUser();
getRamdomUser();
getRamdomUser();
