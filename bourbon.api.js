"use strict";
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
  let query = `SELECT * FROM bourbon WHERE UPPER(description) LIKE UPPER('%${flavor}%') LIMIT 10`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

module.exports = bourbon;
