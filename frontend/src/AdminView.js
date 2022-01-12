import React, { useState } from "react";

function AdminView(props) {
  const [finnishWord, setFinnishWord] = useState([]);
  const [englishWord, setEnglishWord] = useState([]);
  return (
    <div>
      <h1>Add a Word</h1>
      <form onSubmit={props.newWordHandler}>
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

export default AdminView;
