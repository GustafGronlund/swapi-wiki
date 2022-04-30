import "../styles/FilmsPage.scss";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SWApi from "../services/SWApi";
import axios from "axios";
import extractFromUrl, { Url } from "extract-from-url";

const FilmsPage = () => {
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
            <h1>Loading (can be slow sometimes)</h1>
          </section>
        </main>
      </>
    );
  }

  if (loadingData === false) {
    return (
      <>
        <main>
          <section className="filmspage-container">
            {films &&
              films.map((film) => {
                const { path } = extractFromUrl(film.url);
                let uniquePath = path.substring(
                  path.indexOf("/") + 11,
                  path.lastIndexOf("/")
                );
                console.log(uniquePath);
                return (
                  <div key={film.episode_id}>
                    <h1>{film.title}</h1>
                    <div>
                      <p>Episode: {film.episode_id}</p>
                      <p>Release date: {film.release_date}</p>
                      <p>Number of characters: {film.characters.length}</p>
                      <Link to={`/films/${uniquePath}/`}>Read more</Link>
                    </div>
                  </div>
                );
              })}
          </section>
        </main>
      </>
    );
  }
};

export default FilmsPage;
