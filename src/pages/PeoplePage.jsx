import "../styles/PeoplePage.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SWApi from "../services/SWApi";
import extractFromUrl, { Url } from "extract-from-url";

const PeoplePage = () => {
  const [count, setCount] = useState(1);
  const [people, setPeople] = useState("");
  const [loadingData, setLoadingDataStatus] = useState(true);

  const fetchPeople = async () => {
    const data = await SWApi.nextPagePeople(count);
    console.log("Hej här är datan: ", data);
    setPeople("");
    setPeople(data.results);
    setLoadingDataStatus(false);
  };

  if (count <= 0) {
    setCount(9);
    console.log("nu händer något");
  }

  if (count === 10) {
    setCount(1);
    console.log("nu händer något");
  }

  const changePage = async (e) => {
    if (e.target.className === "left-page") {
      setCount(count - 1);
      console.log("vänster");
      setLoadingDataStatus(true);
      fetchPeople();
    } else {
      setCount(count + 1);
      console.log("höger");
      setLoadingDataStatus(true);
      fetchPeople();
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  console.log(people);

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
            {people.map((character) => {
              const urlParts = extractFromUrl(character.url);
              const { path } = extractFromUrl(character.url);
              let uniquePath = path.substring(
                path.indexOf("/") + 12,
                path.lastIndexOf("/")
              );
              // console.log(uniquePath);
              return (
                <div className="film-styling" key={character.created}>
                  <h1>{character.name}</h1>
                  <div>
                    <p>Gender: {character.gender}</p>
                    <p>Born: {character.birth_year}</p>
                    <p>In: {character.films.length} films</p>
                    {/* <Link to={`/films/${film.episode_id}/`}>Läs mer</Link> */}
                  </div>
                  <Link to={`/people/${uniquePath}`}>Read more</Link>
                </div>
              );
            })}
          </section>
        </main>
        <footer>
          <span onClick={changePage} className="left-page">
            left
          </span>
          <span className="left-page">{count} / 9 </span>
          <span onClick={changePage} className="right-page">
            right
          </span>
        </footer>
      </>
    );
  }

  console.log(people);
};

export default PeoplePage;
