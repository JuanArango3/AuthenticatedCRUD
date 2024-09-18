import {Router} from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import adminMiddleware from "../middleware/adminMiddleware";
import {Movie} from "../models/Movies";

const mapMovie = (movie: any) => ({
    title: movie.title,
    director: movie.director,
    producer: movie.producer,
    releaseYear: movie.releaseYear,
    price: movie.price,
});

export default Router().use(tokenMiddleware)
    .get("/", async (req, res) => {
        const movies = await Movie.find().exec();

        return res.status(200).json(movies.map(mapMovie));

    }).post("/", adminMiddleware, async (req, res) => {
        try {
            const { title, director, producer, releaseYear, price } = req.body;

            if (!title || !director || !producer || !releaseYear || !price) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const newMovie = new Movie({
                title,
                director,
                producer,
                releaseYear,
                price
            });

            const savedMovie = await newMovie.save();

            return res.status(201).json({
                message: "Movie created successfully",
                movie: savedMovie
            });
        } catch (e) {
            console.error("Error creating movie:", e);
            return res.status(500).send("Error creating movie");
        }
    }).get("/newer-than/:year", async (req, res) => {
        try {
            const year = parseInt(req.params.year, 10);

            if (isNaN(year)) {
                return res.status(400).json({ error: "Invalid year parameter" });
            }

            const movies = await Movie.find({releaseYear: { $gt: year } }).exec();
            return res.status(200).json(movies.map(mapMovie));
        } catch (e) {
            console.error("Error fetching movie:", e);
            return res.status(500).send("Error fetching movie");
        }
    }).get("/price-less-than/:price", async (req, res) => {
        try {
            const price = parseFloat(req.params.price);

            if (isNaN(price)) {
                return res.status(400).json({ error: "Invalid price parameter" });
            }

            const movies = await Movie.find({ price: { $lte: price } }).exec();

            return res.status(200).json(movies.map(mapMovie));
        } catch (e) {
            console.error("Error fetching movie:", e);
            return res.status(500).send("Error fetching movie");
        }
    })

