const btn = document.getElementById('jokeBtn');
const jokeEl = document.getElementById('joke');

const generateJoke = async () => {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  });

  const joke = await res.json();
  jokeEl.innerText = joke.joke;
};

btn.addEventListener('click', generateJoke);

generateJoke();
