document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const imdbId = params.get("id");

    if (!imdbId) {
        document.getElementById("movieDetail").innerHTML = "<p>Movie not found</p>";
        return;
    }

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzVjNzg3YzdlYzEyMzE5YTc0ZDY2ZGZkNmM1YjI1ZSIsIm5iZiI6MTc0MDc0NTcwMC42OTcsInN1YiI6IjY3YzFhYmU0YTZlNTUxMTE5YTM1YzQzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JiPSvWRabSycHL3eznxz8C4o8Plxi5ivZF0Y-Wj3E24'
        }
      };

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${imdbId}?language=en-US`, options);

        if (!response.ok) {
            throw new Error("Failed to fetch movie details.");
        }

        const movie = await response.json();

        // Handle missing data gracefully
        const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "placeholder.jpg";
        const genres = movie.genres?.map(g => g.name).join(", ") || "N/A";
        const productionCompanies = movie.production_companies?.map(pc => pc.name).join(", ") || "N/A";
        const country = movie.production_countries?.map(c => c.name).join(", ") || "N/A";
        const voteCount = movie.vote_count || "No votes yet";
        const voteAverage = movie.vote_average || "N/A";
        const overview = movie.overview || "No description available.";
        const releaseDate = movie.release_date || "Unknown release date";
        const imdbUrl = movie.imdb_id ? `https://www.imdb.com/title/${movie.imdb_id}` : "#";

        document.getElementById("movieDetail").innerHTML = `
            <h1>${movie.title}</h1>
            <img src="${posterUrl}" alt="${movie.title}" class="movie-poster">
            <p><strong>Description:</strong> ${overview}</p>
            <p><strong>Genre:</strong> ${genres}</p>
            <p><strong>Rating:</strong> ${voteAverage} (${voteCount} votes)</p>
            <p><strong>Production Companies:</strong> ${productionCompanies}</p>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>Release Date:</strong> ${releaseDate}</p>
            <p><strong>IMDB Link:</strong> <a href="${imdbUrl}" target="_blank">View on IMDb</a></p>
        `;

        fetchRecommendations(imdbId);
    } catch (error) {
        console.error("Error fetching movie details:", error);
        document.getElementById("movieDetail").innerHTML = "<p>Error fetching movie details</p>";
    }
});

async function fetchRecommendations(imdbId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${imdbId}/recommendations?language=en-US&page=1`, options);

        if (!response.ok) throw new Error("Failed to fetch recommendations.");

        const data = await response.json();
        const recommendations = data.results;

        if (!recommendations || recommendations.length === 0) {
            document.getElementById("recommendations").innerHTML = "<p>No recommendations available.</p>";
            return;
        }

        let recommendationsHtml = "<h2>Recommended Movies</h2><div class='recommendations-grid'>";

        recommendations.forEach(movie => {
            const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "placeholder.jpg";
            recommendationsHtml += `
                <div class="recommendation-card">
                    <img src="${posterUrl}" alt="${movie.title}">
                    <h4>${movie.title}</h4>
                    <p>⭐ ${movie.vote_average}</p>
                    <a href="movie-detail.html?id=${movie.id}">View Details</a>
                </div>
            `;
        });

        recommendationsHtml += "</div>";
        document.getElementById("recommendations").innerHTML = recommendationsHtml;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        document.getElementById("recommendations").innerHTML = "<p>Error fetching recommendations</p>";
    }
}
