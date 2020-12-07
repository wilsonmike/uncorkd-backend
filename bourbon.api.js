"use strict";
const express = require("express");
const bourbon = express.Router();
const pool = require("./connection");

bourbon.get("/bourbon", (req, res) => {
  let query = `SELECT * FROM bourbon WHERE description LIKE '%vanilla%' LIMIT 10;`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

module.exports = bourbon;
