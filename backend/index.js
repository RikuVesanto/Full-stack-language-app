const express = require("express");
const app = express();
const getWord = require("./routes/getWord.js");
const getWords = require("./routes/getWords.js");
const postWord = require("./routes/postWord.js");
const deleteWord = require("./routes/deleteWord.js");
const modifyWord = require("./routes/modifyWord.js");
const connection = require("./database.js");
