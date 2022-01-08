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
  save: (word) => {
    connection.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(
        `INSERT INTO words(finnish,english) VALUES (${connection.escape(
          word.finnish
        )},${connection.escape(word.english)})`,
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
