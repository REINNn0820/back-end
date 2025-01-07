const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3005;

app.use(express.json());

const readAllMovies = () => {
  fs.readFile("movies.json", "utf8", (err, data) => {
    const moviesJson = JSON.parse(data);
    return moviesJson;
  });
};

app.get("/add-movie", (req, res) => {
  fs.readFile("movies.json", "utf8", (err, data) => {
    const moviesJson = JSON.parse(data);
    const { name } = req.query;

    const newMovie = {
      id: Date.now(),
      title: name,
      year: 2026,
      genre: "Science Fiction",
      director: "Me",
    };
    moviesJson.push(newMovie);
    fs.writeFile(
      "movies.json",
      JSON.stringify(moviesJson, null, 4),
      "utf8",
      (err) => {
        console.log("movies.json updated successfully!");
        res.send("Movie added successfully!");
      }
    );
  });
});

const findById = (req, res) => {
  fs.readFile("movies.json", "utf8", (err, data) => {
    const moviesJson = JSON.parse(data);
    const oneMovieId = Number(req.params.id);

    const foundMovie = moviesJson.find((movie) => movie.id === oneMovieId);

    res.json(foundMovie);
  });
};

const updateById = (req, res) => {
  const movies = readAllMovies();
};

app.get("/movies/:id", updateById);

app.get("/detail/:id", findById);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
