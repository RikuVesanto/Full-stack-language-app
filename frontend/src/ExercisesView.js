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
      if (i === 0) {
        tempEnglishWords = [].concat(data[i].english);
        tempFinnishWords = [].concat(data[i].finnish);
      } else {
        tempEnglishWords = englishWords.concat(data[i].english);
        tempFinnishWords = finnishWords.concat(data[i].finnish);
      }
      console.log(tempEnglishWords);
      console.log(tempFinnishWords);
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
    console.log("word is: ", word);
    console.log(finnishGuessWords);
  };

  const checkScore = () => {
    var score = 0;
    for (var i = 0; i < finnishWords.length; i++) {
      if (finnishWords[i] === finnishGuessWords[i]) {
        score++;
        console.log(score);
      }
    }
    console.log("final score is: ", score);
    return score;
  };

  return (
    <div>
      <Table
        englishWords={englishWords}
        GuessWordHandler={GuessWordHandler}
        checkScore={checkScore}
      />
    </div>
  );
}

export default ExerciseView;
