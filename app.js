const express = require("express");

const app = express();

const port = 5000;


const welcome = (req, res) => {
	res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movies =
	[{
		id: 1,
		title: "Citizen Kane",
		director: "Orson Wells",
		year: "1941",
		colors: false,
		duration: 120,
	},
		{
			id: 2,
			title: "The Godfather",
			director: "Francis Ford Coppola",
			year: "1972",
			colors: true,
			duration: 180,
		},
		{
			id: 3,
			title: "Pulp Fiction",
			director: "Quentin Tarantino",
			year: "1994",
			color: true,
			duration: 180,
		},
	];

const getMovies = (req, res) => {
	res.status(200).send(
		movies
	)
}

app.get("/api/movies", getMovies);

app.get("/api/movies/:id", async function (req, res) {
	let id = req.params.id;
	let movie = await movies.find(movie => id);

	res.status(200).send(movie)
})

app.listen(port, (err) => {
	if (err) {
		console.error("Something bad happened");
	} else {
		console.log(`Server is listening on ${port}`);
	}
});