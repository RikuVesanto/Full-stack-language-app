import Table from "./Table";

function ExerciseView(props) {
  const GuessWordHandler = (event, index, word) => {
    event.preventDefault();
    let tempFinnishGuessWords = props.finnishGuessWords;
    tempFinnishGuessWords[index] = word;
    props.setFinnishGuessWords(tempFinnishGuessWords);
  };

  const checkScore = () => {
    var score = 0;
    for (var i = 0; i < props.finnishWords.length; i++) {
      if (props.finnishWords[i] === props.finnishGuessWords[i]) {
        score++;
      }
    }
    return score;
  };

  const maxScore = () => {
    return props.englishWords.length;
  };

  return (
    <div>
      <Table
        englishWords={props.englishWords}
        GuessWordHandler={GuessWordHandler}
        checkScore={checkScore}
        maxScore={maxScore}
      />
    </div>
  );
}

export default ExerciseView;
