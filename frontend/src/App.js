import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import ExercisesView from "./ExercisesView";
import AdminView from "./AdminView";

function App() {
  //store the word pairs
  const [englishWords, setEnglishWords] = useState([]);
  const [finnishWords, setFinnishWords] = useState([]);
  //store the guessed words
  const [finnishGuessWords, setFinnishGuessWords] = useState([]);

  /**
   * Sends a post request to store the new word pair into the database.
   * @param {string} finnishWord - A finnish word.
   * @param {string} englishWord - An english word.
   */
  const newWordHandler = (finnishWord, englishWord) => {
    var data = { finnish: finnishWord, english: englishWord };
    axios.post("/words/", data).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  /**
   * Sends a post request to edit the word pair in the database.
   * @param {string} finnishWord - A finnish word that was edited.
   * @param {string} englishWord - An english word that was edited.
   * @param {string} oldWord - The old word to help know which word pair to save the edits to.
   */
  const editedWordHandler = (finnishWord, englishWord, oldWord) => {
    var data = { finnish: finnishWord, english: englishWord, old: oldWord };
    axios.post("/words/edit", data).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    loadData().then((data) => loopData(data));
  }, []);

  /**Fetches the initial word data*/
  async function loadData() {
    var data = await fetch(`/words`);
    var dataObject = data.json();
    return dataObject;
  }

  /**
   * Saves the word pairs into local state variables.
   * @param {array} data - An array of word pair objects.
   */
  function loopData(data) {
    for (var i = 0; i <= data.length; i++) {
      var tempEnglishWords = englishWords;
      tempEnglishWords.push(data[i].english);
      var tempFinnishWords = finnishWords;
      tempFinnishWords.push(data[i].finnish);
      setEnglishWords(tempEnglishWords);
      setFinnishWords(tempFinnishWords);
      setFinnishGuessWords(Array(data.length));
    }
  }

  return (
    <div>
      <HashRouter>
        <div className="topnav">
          <div id="myLinks">
            <Link className="link" to="/exercises">
              Exercises
            </Link>
            <Link className="link" to="/admin">
              Admin
            </Link>
          </div>
        </div>
        <Routes>
          <Route
            path="/exercises"
            element={
              <ExercisesView
                finnishWords={finnishWords}
                englishWords={englishWords}
                finnishGuessWords={finnishGuessWords}
                setFinnishGuessWords={setFinnishGuessWords}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminView
                newWordHandler={newWordHandler}
                editedWordHandler={editedWordHandler}
                englishWords={englishWords}
                finnishWords={finnishWords}
                setEnglishWords={setEnglishWords}
                setFinnishWords={setFinnishWords}
              />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
