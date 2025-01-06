const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.get('/add-movie', (req, res) => {
  fs.readFile('movies.json', 'utf8', (err, data) => {

    console.log(req.query);

    const {name} = req.query;

    const moviesJson = JSON.parse(data);


    const newMovie = {
      id:Date.now(),
      title: name,
      year: 2025,
      genre: "Science Fiction",
      director: "Christopher Nolan"
    };


    moviesJson.push(newMovie);

    fs.writeFile('movies.json', JSON.stringify(moviesJson, null, 2), 'utf8', (err) => {
      console.log('movies.json updated successfully!');
      res.send('Movie added successfully!');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
