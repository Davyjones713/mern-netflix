import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ status: "success", content: randomMovie });
  } catch (error) {
    console.log("Error in trending movies controller", error.message);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.json({ status: "success", trailers: data.results });
  } catch (error) {
    console.log("Error in movie trailers controller", error.message);

    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    res.status(200).json({ status: "success", content: data });
  } catch (error) {
    console.log("Error in movie details controller", error.message);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
}

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ status: "success", similar: data.results });
  } catch (error) {
    console.log("Error in similar movies controller", error.message);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
}

export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ status: "success", content: data.results });
  } catch (error) {
    console.log("Error in movies category controller", error.message);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
}
