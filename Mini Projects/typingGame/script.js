const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficulitySelect = document.getElementById('difficulity');
const startbtn = document.getElementById('start');
const howBtn = document.getElementById('how-btn');
const closeBtn = document.getElementById('close-btn');
const modal = document.getElementById('modal-container');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

// Init word, score, time
let randomWord;
let score = 0;
let time = 10;

let difficulity =
  localStorage.getItem('difficulity') !== null
    ? localStorage.getItem('difficulity')
    : 'medium';

difficulitySelect.value = difficulity;

// Focus on text on start
text.focus();

// Game over
const gameOver = () => {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Play Again</button>
    `;

  endgameEl.style.display = 'flex';
};

// Update Time
const updateTime = () => {
  time--;
  timeEl.innerText = time + 's';

  if (time < 5) {
    timeEl.style.color = 'red';
  } else {
    timeEl.style.color = 'white';
  }

  if (time > 0) {
    difficulitySelect.disabled = true;
  }

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
    difficulitySelect.disabled = false;
  }
};

// Start the timer
let timeInterval;

// get a random word
const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

// Add word to DOm
const addWordToDOM = () => {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
};

// Update the score
const updateScore = () => {
  score++;
  scoreEl.innerText = score;
};

addWordToDOM();

// Event listeners
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // clear input
    e.target.value = '';

    if (difficulity === 'hard') {
      time += 3;
    } else if (difficulity === 'medium') {
      time += 4;
    } else {
      time += 6;
    }

    updateTime();
  }
});

// Difficulity btn

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});

// Setting difficulity
settingsForm.addEventListener('change', (e) => {
  difficulity = e.target.value;
  localStorage.setItem('difficulity', difficulity);
});

startbtn.addEventListener('click', () => {
  timeInterval = setInterval(updateTime, 1000);
  startbtn.disabled = true;
});

howBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', () => {
  modal.style.display = 'none';
});
