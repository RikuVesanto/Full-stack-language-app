import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import ExercisesView from "./ExercisesView";
import AdminView from "./AdminView";

function App() {
  const newWordHandler = (finnishWord, englishWord) => {
    var data = { finnish: finnishWord, english: englishWord };
    console.log(data);

    axios.post("http://localhost:8080/words/", data).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <BrowserRouter>
        <div className="topnav">
          <div id="myLinks">
            <Link className="link" to="/exercises">
              Exercises
            </Link>
            <Link className="link" to="/admin">
              Admin
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/exercises" element={<ExercisesView />} />
          <Route
            path="/admin"
            element={<AdminView newWordHandler={newWordHandler} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
