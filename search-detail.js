document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const imdbId = params.get("id");

  if (!imdbId) {
      document.getElementById("movieDetail").innerHTML = "<p>Movie not found</p>";
      return;
  }

  try {
      const response = await fetch(`'https://api.themoviedb.org/3/movie/${imdbId}?language=en-US`);
      const data = await response.json();

      if (!data.ok) {
          document.getElementById("movieDetail").innerHTML = `<p>Error: ${data.description}</p>`;
          return;
      }

      const movie = data.short;
      document.getElementById("movieDetail").innerHTML = `
          <h1>${movie.name}</h1>
          <img src="${movie.image}" alt="${movie.name}">
          <p><strong>Description:</strong> ${movie.description}</p>
          <p><strong>Genre:</strong> ${movie.genre.join(", ")}</p>
          <p><strong>Rating:</strong> ${movie.aggregateRating.ratingValue} (${movie.aggregateRating.ratingCount} votes)</p>
          <p><strong>Director:</strong> ${movie.director.map(d => d.name).join(", ")}</p>
          <p><strong>Actors:</strong> ${movie.actor.map(a => a.name).join(", ")}</p>
          <p><strong>Release Date:</strong> ${movie.datePublished}</p>
          <p><strong>IMDB Link:</strong> <a href="${movie.url}" target="_blank">View on IMDB</a></p>
      `;
  } catch (error) {
      document.getElementById("movieDetail").innerHTML = `<p>Error fetching details</p>`;
  }
});
