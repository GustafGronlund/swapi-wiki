import "./styles/App.scss";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import FilmsPage from "./pages/FilmsPage";
import PeoplePage from "./pages/PeoplePage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/people" element={<PeoplePage />} />
      </Routes>
    </div>
  );
}

export default App;
