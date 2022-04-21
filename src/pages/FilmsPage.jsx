import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SWApi from "../services/SWApi";

const FilmsPage = () => {
  const [getMovies, setMovies] = useState();

  const getStarWarsFilms = async () => {
    const data = await SWApi.getFilms();
    setMovies(data.results);
  };

  useEffect(() => {
    getStarWarsFilms();
  }, []);

  console.log("Mina filmer", getMovies);

  return (
    <>
      <main>
        <section>
          {/* {getMovies.map((film) => {
            return <p>im a film</p>;
          })} */}
        </section>
      </main>
    </>
  );
};

export default FilmsPage;
