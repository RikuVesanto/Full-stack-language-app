const express = require("express");
var router = express.Router();
const connection = require("./../database.js");

router.post("/:id([0-9]+)", async (req, res) => {
  let words = req.body;
  await connection.updateWord(words, req.params.id);
  res.send("Word pair was updated.");
});

module.exports = router;
