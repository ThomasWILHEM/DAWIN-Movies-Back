const Movie = require("../models/movie.model.js");

// Create and Save a new Movie
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Movie
    const tutorial = new Movie({
        title: req.body.title,
        year: req.body.year,
        language: req.body.language,
        directorId: req.body.directorId,
        genre: req.body.genre,
    });

    // Save Movie in the database
    Movie.create(tutorial, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Movie."
            });
        else res.send(data);
    });
};

// Retrieve all Movies from the database (with condition).
exports.getAll = (req, res) => {

    Movie.getAll(null, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

// Find a single Movie with a id
exports.findById = (req, res) => {
    Movie.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Movie with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Movie with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Movie identified by the id in the request
exports.updateById = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Movie.updateById(
        req.params.id,
        new Movie(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Movie with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Movie with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Movie with the specified id in the request
exports.remove = (req, res) => {
    Movie.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Movie with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Movie with id " + req.params.id
                });
            }
        } else res.send({ message: `Movie was deleted successfully!` });
    });
};
