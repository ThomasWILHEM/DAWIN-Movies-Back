module.exports = app => {
    const movies = require("../controllers/movie.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", movies.create);

    // Retrieve all Tutorials
    router.get("/", movies.getAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", movies.findById);

    // Update a Tutorial with id
    router.put("/:id", movies.updateById);

    // Delete a Tutorial with id
    router.delete("/:id", movies.remove);

    app.use('/api/movies', router);
};