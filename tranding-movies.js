// import { options } from "./apicallheader";
const slider = document.querySelector('.slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzVjNzg3YzdlYzEyMzE5YTc0ZDY2ZGZkNmM1YjI1ZSIsIm5iZiI6MTc0MDc0NTcwMC42OTcsInN1YiI6IjY3YzFhYmU0YTZlNTUxMTE5YTM1YzQzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JiPSvWRabSycHL3eznxz8C4o8Plxi5ivZF0Y-Wj3E24'
  }
};

// Fetch data from API
fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
  .then(response => response.json())
  .then(data => {
    slider.innerHTML = ''; // Clear existing content

    data.results.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('tranding-movie-card');

      // Use the movie title or name (for TV shows)
      const title = movie.title || movie.name;

      // Use movie poster if available, otherwise a placeholder
      const imageUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : './images/placeholder.jpg';

      movieCard.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <h3>${title}</h3>
      `;

      // Add click event to navigate to search-details.html with movie ID
      movieCard.addEventListener('click', () => {
        window.location.href = `search-details.html?id=${movie.id}`;
      });

      slider.appendChild(movieCard);
    });

    // Start auto-scrolling after content loads
    startAutoScroll();
  })
  .catch(error => console.error('Error fetching movies:', error));

// Scroll functionality for next and previous buttons
nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: 220, behavior: 'smooth' });
    // resetAutoScroll();
});

prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -220, behavior: 'smooth' });
    // resetAutoScroll();
});

// Function to automatically scroll the slider
let autoScroll;
function startAutoScroll() {
    autoScroll = setInterval(() => {
        slider.scrollBy({ left: 220, behavior: 'smooth' });
    }, 3000); // Scroll every 3 seconds
}

// Function to reset auto-scroll after manual navigation
function resetAutoScroll() {
    clearInterval(autoScroll);
    startAutoScroll();
}

// Start auto-scrolling when the page loads
startAutoScroll();
