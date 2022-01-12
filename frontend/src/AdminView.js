import React, { useState } from "react";
import axios from "axios";

function AdminView(props) {
  const [finnishWord, setFinnishWord] = useState([]);
  const [englishWord, setEnglishWord] = useState([]);
  const [editState, setEditState] = useState(false);

  const deleteWord = (word) => {
    axios.delete("http://localhost:8080/words/" + word);
  };

  var tableRows = [];
  for (var i = 0; i < props.englishWords.length; i++) {
    tableRows.push(
      <tr key={i}>
        <td>{props.englishWords[i]}</td>
        <td>{props.finnishWords[i]}</td>
        <td>
          <button onClick={() => setEditState(true)}>Edit</button>
        </td>
        <td>
          <button
            id={props.englishWords[i]}
            onClick={(event) => deleteWord(event.target.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
  return (
    <div>
      <h1>Add a Word</h1>
      <form onSubmit={() => props.newWordHandler(finnishWord, englishWord)}>
        <label>In English:</label>
        <br />
        <input
          type="text"
          id="english"
          name="english"
          value={englishWord}
          onChange={(event) => setEnglishWord(event.target.value)}
          required
        />
        <br />
        <label>In Finnish:</label>
        <br />
        <input
          type="text"
          id="finnish"
          name="finnish"
          value={finnishWord}
          onChange={(event) => setFinnishWord(event.target.value)}
          required
        />
        <br />
        <input type="submit" value="Add Word" />
      </form>
      <table>
        <thead>
          <tr>
            <th>English</th>
            <th>Finnish</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default AdminView;
