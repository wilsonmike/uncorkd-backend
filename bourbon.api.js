"use strict";
const express = require("express");
const bourbon = express.Router();
const pool = require("./connection");

bourbon.get("/trending", (req, res) => {
  let query = `SELECT * FROM bourbon WHERE description LIKE '%vanilla%' LIMIT 10;`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

bourbon.get("/bourbons", (req, res) => {
  let term = req.query.term;
  console.log(term);
  let query = `SELECT * FROM bourbon WHERE brand LIKE '${term}%';`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

// bourbon.get("/", (req, res, searchTerm)=>{
//   let query = `SELECT * FROM bourbon WHERE brand LIKE ${searchTerm}`
// })

module.exports = bourbon;
