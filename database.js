const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createPool({
  connectionLimit: process.env.DB_CLIMIT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

let connectionFunctions = {
  /**
   * Saves a word pair into the database.
   * @param {object} words - Holds the word data that is put into the database.
   */
  save: (words) => {
    connection.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(
        `INSERT INTO words(finnish,english) VALUES (${connection.escape(
          words.finnish
        )},${connection.escape(words.english)})`,
        function (error, results, fields) {
          connection.release();
          if (error) throw error;
        }
      );
    });
  },
  /**
   * Finds a Finnish word from the database.
   * @param {string} englishWord - An English word to help find the Finnish word pair.
   */
  findByEnglishWord: (englishWord) => {
    function find(resolve, reject) {
      connection.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.query(
          `SELECT finnish from words WHERE english= "${englishWord}"`,
          (err, finnish) => {
            if (err) reject(err);
            resolve(finnish);
            connection.release();
          }
        );
      });
    }
    var promise = new Promise(find);
    return promise;
  },
  /**Takes all word pairs from the database.*/
  findAllWords: () => {
    function find(resolve, reject) {
      connection.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.query("SELECT english,finnish FROM words", (err, words) => {
          resolve(words);
          connection.release();
        });
      });
    }
    var promise = new Promise(find);
    return promise;
  },
  /**
   * Deletes an English word from the database.
   * @param {string} englishWord - An English word to delete from the database.
   */
  deleteWord: (englishWord) => {
    connection.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `DELETE FROM words WHERE english= "${englishWord}"`,
        function (error, results, fields) {
          connection.release();
          if (error) throw error;
        }
      );
    });
  },
  /**
   * Updates a word pair into the database.
   * @param {object} words - Holds the word data that is put into the database and the old word to know what to update.
   */
  updateWord: (words) => {
    connection.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(
        `UPDATE words SET finnish=${connection.escape(
          words.finnish
        )}, english=${connection.escape(
          words.english
        )} WHERE english =${connection.escape(words.old)}`,
        function (error, results, fields) {
          connection.release();
          if (error) throw error;
        }
      );
    });
  },
};

module.exports = connectionFunctions;
