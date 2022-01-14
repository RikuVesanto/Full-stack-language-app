const express = require("express");
var router = express.Router();
const connection = require("./../database.js");

router.delete("/:english([a-zA-ZäöåÄÖÅ]+)", async (req, res) => {
  await connection.deleteWord(req.params.english);
  res.send("The word was deleted from the database");
});

module.exports = router;
