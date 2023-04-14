const sql = require("./db.js");

// constructor
const Movie = function(movie) {
    this.title = movie.title;
    this.year = movie.year;
    this.language = movie.language;
    this.directorId = movie.directorId;
    this.genre = movie.genre;
};

Movie.create = (newMovie, result) => {
    sql.query("INSERT INTO movies SET ?", newMovie, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tutorial: ", { id: res.insertId, ...newMovie });
        result(null, { id: res.insertId, ...newMovie });
    });
};

Movie.findById = (id, result) => {
    sql.query(`SELECT * FROM movies WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Movie with the id
        result({ kind: "not_found" }, null);
    });
};

Movie.getAll = (title, result) => {
    let query = "SELECT * FROM movies";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("movies: ", res);
        result(null, res);
    });
};

Movie.updateById = (id, tutorial, result) => {
    sql.query(
        "UPDATE movies SET title = ?, description = ?, published = ? WHERE id = ?",
        [tutorial.title, tutorial.description, tutorial.published, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Movie with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated tutorial: ", { id: id, ...tutorial });
            result(null, { id: id, ...tutorial });
        }
    );
};

Movie.remove = (id, result) => {
    sql.query("DELETE FROM movies WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Movie with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tutorial with id: ", id);
        result(null, res);
    });
};

module.exports = Movie;