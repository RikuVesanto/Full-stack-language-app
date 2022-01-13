const express = require("express");
var router = express.Router();
const connection = require("./../database.js");

router.post("/", async (req, res) => {
  let words = req.body;
  await connection.updateWord(words);
  res.send("Word pair was updated.");
});

module.exports = router;
