document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("search");

  if (query) {
      fetchMovies(query);
  }
});

function fetchMovies(query) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzVjNzg3YzdlYzEyMzE5YTc0ZDY2ZGZkNmM1YjI1ZSIsIm5iZiI6MTc0MDc0NTcwMC42OTcsInN1YiI6IjY3YzFhYmU0YTZlNTUxMTE5YTM1YzQzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JiPSvWRabSycHL3eznxz8C4o8Plxi5ivZF0Y-Wj3E24'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
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

