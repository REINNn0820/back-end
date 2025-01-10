import express, { Request, Response } from "express";
import fs from "fs";
const app = express();

const PORT = 4001;

app.use(express.json());

const readAllMovies = (res: Response) => {
  fs.readFile(
    "movies.json",
    "utf8",
    (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Error reading file" });
      }
      const moviesJson = JSON.parse(data);
      res.json(moviesJson);
    }
  );
};

app.get("/add-movie", (req: Request, res: Response) => {
  fs.readFile(
    "movies.json",
    "utf8",
    (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Error reading file" });
      }

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
        (err: any) => {
          if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).json({ error: "Error saving movie" });
          }
          console.log("movies.json updated successfully!");
          res.send("Movie added successfully!");
        }
      );
    }
  );
});

const findById = (req: Request, res: Response) => {
  fs.readFile(
    "movies.json",
    "utf8",
    (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Error reading file" });
      }
      const moviesJson = JSON.parse(data);
      const oneMovieId = Number(req.params.id);

      const foundMovie = moviesJson.find(
        (movie: any) => movie.id === oneMovieId
      );
      if (foundMovie) {
        res.json(foundMovie);
      } else {
        res.status(404).json({ error: "Movie not found" });
      }
    }
  );
};

app.delete("/delete/:id", (req: Request, res: Response) => {
  const movieId = req.params.id;

  fs.readFile(
    "movies.json",
    "utf8",
    (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Error reading file" });
      }

      const moviesJson = JSON.parse(data);
      const deleteMovies = moviesJson.filter(
        (e: any) => e.id !== Number(movieId)
      );

      fs.writeFile(
        "movies.json",
        JSON.stringify(deleteMovies, null, 4),
        "utf8",
        (err: any) => {
          if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).json({ error: "Error deleting movie" });
          }
          res.json({ message: "Movie deleted successfully" });
        }
      );
    }
  );
});

app.get("/", (req: Request, res: Response) => {
  readAllMovies(res);
});

app.get("/detail/:id", findById);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
