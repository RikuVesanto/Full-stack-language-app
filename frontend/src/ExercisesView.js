import React, { useState, useEffect } from "react";
import Table from "./Table";

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
      <Table englishWords={englishWords} />
    </div>
  );
}

export default ExerciseView;
