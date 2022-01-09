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
  save: (words) => {
    connection.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(
        `INSERT INTO words(finnish,english) VALUES (${connection.escape(
          words.finnish
        )},${connection.escape(words.english)})`,
        function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();

          // Handle error after the release.
          if (error) throw error;

          // Don't use the connection here, it has been returned to the pool.
        }
      );
    });
  },
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
  findAllEnglishWords: () => {
    function find(resolve, reject) {
      connection.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.query("SELECT english FROM words", (err, words) => {
          resolve(words);
          connection.release();
        });
      });
    }

    var promise = new Promise(find);
    return promise;
  },
  deleteWord: (englishWord) => {
    connection.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `DELETE FROM words WHERE english= "${englishWord}"`,
        function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();

          // Handle error after the release.
          if (error) throw error;

          // Don't use the connection here, it has been returned to the pool.
        }
      );
    });
  },
  updateWord: (words, id) => {
    connection.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(
        `UPDATE words SET finnish=${connection.escape(
          words.finnish
        )}, english=${connection.escape(
          words.english
        )} WHERE wordId =${connection.escape(id)}`,
        function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();

          // Handle error after the release.
          if (error) throw error;

          // Don't use the connection here, it has been returned to the pool.
        }
      );
    });
  },
};

module.exports = connectionFunctions;
