import Table from "./Table";

function ExerciseView(props) {
  /**
   * Updates the FinnishGuessWord state variable as the user is writing their guess.
   * @param {object} event - onChange event.
   * @param {object} index - Holds the index number of the guess word that is being updated
   * @param {object} word - The guessed word.
   */
  const GuessWordHandler = (event, index, word) => {
    event.preventDefault();
    let tempFinnishGuessWords = props.finnishGuessWords;
    tempFinnishGuessWords[index] = word;
    props.setFinnishGuessWords(tempFinnishGuessWords);
  };

  /**
   * Compares the Finnish words to the guessed words and increases the score if the match.
   * @returns {number}
   */
  const checkScore = () => {
    var score = 0;
    for (var i = 0; i < props.finnishWords.length; i++) {
      if (props.finnishWords[i] === props.finnishGuessWords[i]) {
        score++;
      }
    }
    return score;
  };

  /**
   * Returns the maximum amount of points available.
   * @returns {number}
   */
  const maxScore = () => {
    return props.englishWords.length;
  };

  return (
    <div className="container">
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
