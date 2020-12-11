"use strict";
const { urlencoded } = require("express");
const express = require("express");
const bourbon = express.Router();
const pool = require("./connection");

//For trending
bourbon.get("/trending", (req, res) => {
  let query = `SELECT * FROM bourbon WHERE description LIKE '%vanilla%' LIMIT 10;`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

//For search bar
bourbon.get("/bourbons", (req, res) => {
  let term = req.query.term;
  console.log(term);
  let query = `SELECT * FROM bourbon WHERE UPPER(brand) LIKE UPPER('%${term}%');`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

//Train to flavor town

bourbon.get("/flavor", (req, res) => {
  let flavor = req.query.flavor;
  console.log(flavor);
  let query = `SELECT * FROM bourbon WHERE UPPER(description) LIKE UPPER('%${flavor}%') ORDER BY RANDOM() LIMIT 10`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

bourbon.post("/bourbons", (req, res) => {
  pool.query(
    `INSERT INTO user_rating (bourbon_id, username, rating) VALUES ($1, $2, $3)`,
    [
      parseInt(req.body.bourbon_id),
      req.body.username,
      parseInt(req.body.rating),
    ],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        console.log(req.body);
      } else {
        res.status(200).json({ status: "ok" });
      }
    }
  );
});

module.exports = bourbon;
