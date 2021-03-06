"use strict";

const express = require("express");
const bourbon = express.Router();
const pool = require("./connection");

//For trending
bourbon.get("/trending", (req, res) => {
  let query = `SELECT * FROM bourbon   
ORDER BY RANDOM ()  
LIMIT 20`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});
// `SELECT * FROM bourbon WHERE description LIKE '%vanilla%' LIMIT 10;`

// SELECT column FROM table
// ORDER BY RANDOM ()
// LIMIT 1

//For search bar
bourbon.get("/bourbons", (req, res) => {
  let term = req.query.term;
  console.log(term);
  let query = `SELECT * FROM bourbon WHERE UPPER(brand) LIKE UPPER('%${term}%') OR UPPER(distillery) LIKE UPPER('%${term}%');`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

//Train to flavor town

bourbon.get("/flavor", (req, res) => {
  let flavor = req.query.flavor;
  let proof = req.query.proof;
  console.log(flavor, proof);
  let query = `SELECT * FROM bourbon WHERE UPPER(description) LIKE UPPER('%${flavor}%') AND proof <= ${proof} ORDER BY RANDOM() LIMIT 20 `;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

// SELECT * FROM bourbon
// WHERE UPPER(description)
// LIKE UPPER('%Honey%') AND proof <= 90 ORDER BY RANDOM() LIMIT 20

bourbon.post("/bourbons", (req, res) => {
  pool.query(
    `INSERT INTO user_rating (bourbon_id, username, rating, displayName, brand, img_url, photo_url, user_comment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      parseInt(req.body.bourbon_id),
      req.body.username,
      parseInt(req.body.rating),
      req.body.displayName,
      req.body.brand,
      req.body.img_url,
      req.body.photo_url,
      req.body.user_comment,
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

bourbon.get("/feed", (req, res) => {
  let query = `SELECT * FROM user_rating`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

bourbon.post("/submit", (req, res) => {
  pool.query(
    `INSERT INTO submit_bourbon (brand, distillery, proof, upload_img, description) VALUES ($1, $2, $3, $4, $5)`,
    [
      req.body.brand,
      req.body.distillery,
      req.body.proof,
      req.body.upload_img,
      req.body.description,
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
