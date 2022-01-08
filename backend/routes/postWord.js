const express = require("express");
var router = express.Router();
const connection = require("./database.js");

router.post("/", async (req, res) => {
  let words = req.body;
  await connection.save(words);
  res.send("Word pair was put into the database");
});

module.exports = router;
