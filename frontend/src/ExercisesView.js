import React, { useState, useEffect } from "react";

function ExerciseView(props) {
  const [englishWords, setEnglishWords] = useState([]);

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
    for (var i = 0; i <= data.length; i++) {
      if (i === 0) {
        tempEnglishWords = [].concat(data[i].english);
      } else {
        tempEnglishWords = englishWords.concat(data[i].english);
      }
      console.log(tempEnglishWords);
      setEnglishWords(tempEnglishWords);
    }
  }
  return (
    <div>
      {englishWords.map((word) => (
        <p key={word}>{word}</p>
      ))}
    </div>
  );
}

export default ExerciseView;
