import "./styles/App.scss";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import FilmsPage from "./pages/FilmsPage";
import PeoplePage from "./pages/PeoplePage";
import FilmPage from "./pages/FilmPage";
import OnePeoplePage from "./pages/OnePeoplePage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/films/:id" element={<FilmPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:id" element={<OnePeoplePage />} />
      </Routes>
    </div>
  );
}

export default App;
