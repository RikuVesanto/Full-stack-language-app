import React, { useState } from "react";
import axios from "axios";

function AdminView(props) {
  const [finnishWord, setFinnishWord] = useState([]);
  const [englishWord, setEnglishWord] = useState([]);
  const [oldWord, setOldWord] = useState("");
  const [editState, setEditState] = useState(false);

  const deleteWord = (removedWord) => {
    const removeFinnishWord = (removedFinnishWord) => {
      var tempFinnishWords = props.finnishWords.filter(
        (word) => word !== removedFinnishWord.data[0].finnish
      );
      props.setFinnishWords(tempFinnishWords);
    };
    axios
      .get(`http://localhost:8080/words/${removedWord}`)
      .then((response) => removeFinnishWord(response));
    var tempEnglishWords = props.englishWords.filter(
      (word) => word !== removedWord
    );
    props.setEnglishWords(tempEnglishWords);
    axios.delete(`http://localhost:8080/words/${removedWord}`);
  };

  var form;
  if (editState) {
    form = (
      <div>
        <h1>Edit a Word</h1>
        <form
          onSubmit={() =>
            props.editedWordHandler(finnishWord, englishWord, oldWord)
          }
        >
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
          <input type="submit" value="Edit Word" />
        </form>
      </div>
    );
  } else {
    form = (
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
      </div>
    );
  }

  var tableRows = [];
  for (var i = 0; i < props.englishWords.length; i++) {
    tableRows.push(
      <tr key={i}>
        <td>{props.englishWords[i]}</td>
        <td>{props.finnishWords[i]}</td>
        <td>
          <button
            id={i}
            onClick={(event) => {
              setEditState(true);
              setFinnishWord(props.finnishWords[event.target.id]);
              setEnglishWord(props.englishWords[event.target.id]);
              setOldWord(props.englishWords[event.target.id]);
            }}
          >
            Edit
          </button>
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
      {form}
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
