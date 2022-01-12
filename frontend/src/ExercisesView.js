import React, { useState, useEffect } from "react";
import Table from "./Table";

function ExerciseView(props) {
  const [englishWords, setEnglishWords] = useState([]);
  const [finnishWords, setFinnishWords] = useState([]);
  const [finnishGuessWords, setFinnishGuessWords] = useState([]);

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

  const GuessWordHandler = (event, index, word) => {
    event.preventDefault();
    let tempFinnishGuessWords = finnishGuessWords;
    tempFinnishGuessWords[index] = word;
    setFinnishGuessWords(tempFinnishGuessWords);
  };

  const checkScore = () => {
    var score = 0;
    for (var i = 0; i < finnishWords.length; i++) {
      if (finnishWords[i] === finnishGuessWords[i]) {
        score++;
      }
    }
    return score;
  };

  const maxScore = () => {
    return englishWords.length;
  };

  return (
    <div>
      <Table
        englishWords={englishWords}
        GuessWordHandler={GuessWordHandler}
        checkScore={checkScore}
        maxScore={maxScore}
      />
    </div>
  );
}

export default ExerciseView;
