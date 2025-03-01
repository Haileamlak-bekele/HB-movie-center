export default async function handler(req, res) {
  const response = await fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US", {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`,
      },
  });

  if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch movies" });
  }

  const data = await response.json();
  res.status(200).json(data);
}
