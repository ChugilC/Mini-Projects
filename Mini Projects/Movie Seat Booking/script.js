const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const button = document.getElementById('btn');

const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// Save selected movie  index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

// UPdate total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const occupiedSeats = document.querySelectorAll('.row .seat.occupied');

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  const occupiedIndex = [...occupiedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  localStorage.setItem('occupiedSeats', JSON.stringify(occupiedIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// Get data from LS and update UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  if (occupiedSeats !== null && occupiedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (occupiedSeats.indexOf(index) > -1) {
        seat.classList.add('occupied');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
  if (selectedMoviePrice !== null) {
    ticketPrice = selectedMoviePrice;
  }
};

// Movie select events
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat events
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Book Tickets
button.addEventListener('click', (e) => {
  const selectedSeats = document.querySelectorAll('.row .selected');
  selectedSeats.forEach((seat) => {
    seat.classList.remove('selected');
    seat.classList.add('occupied');
  });

  localStorage.removeItem('selectedSeats');
  localStorage.removeItem('selectedMoviePrice');
  localStorage.removeItem('selectedMovieIndex');

  updateSelectedCount();
});

populateUI();
updateSelectedCount();
