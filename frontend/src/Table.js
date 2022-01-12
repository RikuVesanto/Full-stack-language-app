import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

function Table(props) {
  const [showScore, setShowScore] = useState(false);
  var displayScore = [];
  if (showScore) {
    displayScore.push(<p key="score">{props.checkScore()}</p>);
  } else {
    displayScore.push(
      <button key="scoreButton" onClick={() => setShowScore(true)}>
        Check Score
      </button>
    );
  }
  var tableRows = [];
  for (var i = 0; i < props.englishWords.length; i++) {
    tableRows.push(
      <tr key={i}>
        <td>{props.englishWords[i]}</td>
        <td>
          <TextField
            id={i.toString()}
            onChange={(event) =>
              props.GuessWordHandler(
                event,
                parseInt(event.target.id),
                event.target.value
              )
            }
          />
          ;
        </td>
      </tr>
    );
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>English</th>
            <th>Finnish</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      {displayScore}
    </div>
  );
}

export default Table;
