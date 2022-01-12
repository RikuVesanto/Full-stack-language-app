import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import ExercisesView from "./ExercisesView";
import AdminView from "./AdminView";

function App() {
  const [englishWords, setEnglishWords] = useState([]);
  const [finnishWords, setFinnishWords] = useState([]);
  const [finnishGuessWords, setFinnishGuessWords] = useState([]);

  const newWordHandler = (finnishWord, englishWord) => {
    var data = { finnish: finnishWord, english: englishWord };
    console.log(data);

    axios.post("http://localhost:8080/words/", data).then(
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

  async function loadData() {
    var data = await fetch(`http://localhost:8080/words`);
    var dataObject = data.json();
    return dataObject;
  }

  function loopData(data) {
    var tempEnglishWords;
    var tempFinnishWords;
    for (var i = 0; i <= data.length; i++) {
      tempEnglishWords = englishWords;
      tempEnglishWords.push(data[i].english);
      tempFinnishWords = finnishWords;
      tempFinnishWords.push(data[i].finnish);
      setEnglishWords(tempEnglishWords);
      setFinnishWords(tempFinnishWords);
      setFinnishGuessWords(Array(data.length));
    }
  }

  return (
    <div>
      <BrowserRouter>
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
                englishWords={englishWords}
                finnishWords={finnishWords}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
