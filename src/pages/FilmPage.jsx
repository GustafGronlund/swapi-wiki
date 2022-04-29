import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SWApi from "../services/SWApi";
import "../styles/FilmPage.scss";
import extractFromUrl, { Url } from "extract-from-url";

const Film = () => {
  let { id } = useParams();
  const [film, setFilm] = useState("");

  const fetchFilm = async () => {
    console.log("här är id", id);
    const data = await SWApi.getSingleFilm(id);
    console.log(data);
    setFilm(data.data);
  };

  useEffect(() => {
    fetchFilm();
  }, []);

  return (
    <>
      <section>
        {film && (
          <>
            <div className="main-container">
              <h2>{film.title}</h2>
              <p>Director: {film.director}</p>
              <p>
                {`Producer(s)`}: {film.producer}
              </p>
              <p>Episode: {film.episode_id}</p>
              <p>Release date: {film.release_date}</p>
              <p>Number of characters: {film.characters.length}</p>
            </div>
            <div className="character-container">
              {film.characters.map((characterURL) => {
                const urlParts = extractFromUrl(characterURL);
                const { path } = extractFromUrl(characterURL);
                let uniquePath = path.substring(
                  path.indexOf("/") + 12,
                  path.lastIndexOf("/")
                );
                console.log(uniquePath);
                return (
                  <div className="character-styling" key={characterURL}>
                    <Link to={`/people/${uniquePath}`}>
                      Character: {uniquePath}
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Film;
