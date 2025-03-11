document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("search");
  
    if (query) {
      fetchMovies(query);
    }
  });
  
  function fetchMovies(query) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzVjNzg3YzdlYzEyMzE5YTc0ZDY2ZGZkNmM1YjI1ZSIsIm5iZiI6MTc0MDc0NTcwMC42OTcsInN1YiI6IjY3YzFhYmU0YTZlNTUxMTE5YTM1YzQzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JiPSvWRabSycHL3eznxz8C4o8Plxi5ivZF0Y-Wj3E24",
      },
    };
  
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          displayResults(data.results);
        } else {
          console.error("Invalid API response:", data);
          displayResults([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        displayResults([]);
      });
  }
  
  function displayResults(movies) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";
  
    if (movies.length === 0) {
      resultsContainer.innerHTML = "<p>No results found</p>";
      return;
    }
  
    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");
  
      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "placeholder.jpg"; // Use a placeholder if no poster is available
  
      movieCard.innerHTML = `
        <img src="${posterUrl}" alt="${movie.title}" class="movie-poster">
        <h3>${movie.title} (${movie.release_date ? movie.release_date.split("-")[0] : "N/A"})</h3>
        <p><strong>Rating:</strong> ${movie.vote_average}/10</p>
      `;
  
      movieCard.addEventListener("click", () => {
        window.location.href = `search-details.html?id=${movie.id}`;
      });
  
      resultsContainer.appendChild(movieCard);
    });
  }
  