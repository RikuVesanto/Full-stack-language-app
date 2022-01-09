const express = require("express");
var router = express.Router();
const connection = require("./../database.js");
router.get("/:english([a-zA-ZäöåÄÖÅ]+)", async (req, res) => {
  var result = await connection.findByEnglishWord(req.params.english);
  res.send(result);
});

module.exports = router;
