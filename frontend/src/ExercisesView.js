import React, { useState, useEffect } from "react";
import Table from "./Table";

function ExerciseView(props) {
  const [englishWords, setEnglishWords] = useState([]);
  const [finnishWords, setFinnishWords] = useState([]);

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
    }
  }
  return (
    <div>
      <Table englishWords={englishWords} />
    </div>
  );
}

export default ExerciseView;
