import React, { useState } from "react";
import axios from "axios";

function AdminView(props) {
  //stores the new word pairs being created by the form
  const [finnishWord, setFinnishWord] = useState([]);
  const [englishWord, setEnglishWord] = useState([]);
  //stores the old word that is being edited
  const [oldWord, setOldWord] = useState("");
  //changes the form between editing and adding new words
  const [editState, setEditState] = useState(false);

  /**
   * Sends a delete request to remove the word from the database and filters the local state
   * variables from having the word.
   * @param {array} removedWord - The word that is being removed.
   */
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
          className="form"
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
        <form
          className="form"
          onSubmit={() => props.newWordHandler(finnishWord, englishWord)}
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
          <input className="submit" type="submit" value="Add Word" />
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
              //changes the form to editing state
              setEditState(true);
              //stores which words are being edited
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
    <div className="container">
      {form}
      <table className="table">
        <thead>
          <tr>
            <th>English</th>
            <th>Finnish</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default AdminView;
