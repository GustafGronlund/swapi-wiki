import "../styles/FilmsPage.scss";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SWApi from "../services/SWApi";
import axios from "axios";

const FilmsPage = () => {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [films, setFilms] = useState("");
  const [loadingData, setLoadingDataStatus] = useState(true);

  const fetchFilms = async () => {
    const data = await SWApi.getFilms();
    console.log("Hej här är datan: ", data);
    setFilms(data.data.results);
    setLoadingDataStatus(false);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  if (loadingData === true) {
    return (
      <>
        <main>
          <section>
            <h1>Data laddas (brukar gå långsamt)</h1>
          </section>
        </main>
      </>
    );
  }

  if (loadingData === false) {
    return (
      <>
        <main>
          <section>
            {films &&
              films.map((film) => {
                return (
                  <div className="film-styling" key={film.episode_id}>
                    <h1>{film.title}</h1>
                    <div>
                      <p>Episode: {film.episode_id}</p>
                      <p>Release date: {film.release_date}</p>
                      <p>Number of characters: {film.characters.length}</p>
                      <Link to={`/films/${film.episode_id}/`}>Läs mer</Link>
                    </div>
                  </div>
                );
              })}
          </section>
        </main>
      </>
    );
  }

  console.log(films);
};

export default FilmsPage;
