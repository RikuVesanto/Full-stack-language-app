import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ExercisesView from "./ExercisesView";
import AdminView from "./AdminView";

function App() {
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
          <Route path="/admin" element={<AdminView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
