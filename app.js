require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
	res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const validateMovie = require("./validateMovie");
const validateUser = require("./validateUser");

app.get("/api/movies", movieHandlers.getMovies);
app.post("/api/movies", validateMovie.validateMovie, movieHandlers.postMovie);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.put("/api/movies/:id", validateMovie.validateMovie, movieHandlers.putMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.get("/api/users", userHandlers.getUsers);
app.post("/api/users", validateUser.validateUser, userHandlers.postUser);
app.get("/api/users/:id", userHandlers.getUserById);
app.put("/api/users/:id", validateUser.validateUser, userHandlers.putUser);
app.delete("/api/users/:id", userHandlers.deleteUser);


app.listen(port, (err) => {
	if (err) {
		console.error("Something bad happened");
	} else {
		console.log(`Server is listening on ${port}`);
	}
});
