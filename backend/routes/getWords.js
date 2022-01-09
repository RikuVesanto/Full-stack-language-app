const express = require("express");
var router = express.Router();
const connection = require("./../database.js");

router.get("/", async (req, res) => {
  var result = await connection.findAllEnglishWords();
  res.send(result);
});

module.exports = router;
