document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("search");

  if (query) {
      fetchMovies(query);
  }
});

function fetchMovies(query) {
  fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${query}`) // Replace with actual API URL
      .then(response => response.json())
      .then(data => displayResults(data.description))
      .catch(error => console.error("Error fetching movies:", error));
}

function displayResults(movies) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = ""; 

  if (movies.length === 0) {
      resultsContainer.innerHTML = "<p>No results found</p>";
      return;
  }

  movies.forEach(movie => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      movieCard.innerHTML = `
          <img src="${movie["#IMG_POSTER"]}" alt="${movie["#TITLE"]}" class="movie-poster">
          <h3>${movie["#TITLE"]} (${movie["#YEAR"]})</h3>
          <p><strong>Actors:</strong> ${movie["#ACTORS"]}</p>
          <a href="${movie["#IMDB_URL"]}" target="_blank">View on IMDb</a>
      `;

      resultsContainer.appendChild(movieCard);
  });
}


function displayResults(movies) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = ""; 

  if (movies.length === 0) {
      resultsContainer.innerHTML = "<p>No results found</p>";
      return;
  }

  movies.forEach(movie => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      movieCard.innerHTML = `
          <img src="${movie["#IMG_POSTER"]}" alt="${movie["#TITLE"]}" class="movie-poster">
          <h3>${movie["#TITLE"]} (${movie["#YEAR"]})</h3>
          <p><strong>Actors:</strong> ${movie["#ACTORS"]}</p>
      `;

      movieCard.addEventListener("click", () => {
          window.location.href = `search-details.html?imdb_id=${movie["#IMDB_ID"]}`;
      });

      resultsContainer.appendChild(movieCard);
  });
}

