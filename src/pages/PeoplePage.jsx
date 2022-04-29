import "../styles/PeoplePage.scss";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SWApi from "../services/SWApi";
import axios from "axios";
import extractFromUrl, { Url } from "extract-from-url";

const PeoplePage = () => {
  const params = useParams();
  const [count, setCount] = useState(1);
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState("");
  const [loadingData, setLoadingDataStatus] = useState(true);

  const fetchPeople = async () => {
    const data = await SWApi.getPeople(1);
    console.log("Hej här är datan: ", data);
    setPeople(data.results);
    setLoadingDataStatus(false);
  };

  const changePage = async (e) => {
    if (e.target.className === "left-page") {
      setCount(count - 1);
      console.log("vänster");
    } else {
      setCount(count + 1);
      console.log("höger");
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
              const urlParts: Url = extractFromUrl(character.url);
              console.log(urlParts);
              let peopleID = character.url;
              return (
                <div className="film-styling" key={character.created}>
                  <h1>{character.name}</h1>
                  <div>
                    <p>Gender: {character.gender}</p>
                    <p>Born: {character.birth_year}</p>
                    <p>In: {character.films.length} films</p>
                    {/* <Link to={`/films/${film.episode_id}/`}>Läs mer</Link> */}
                  </div>
                  <Link to={`/people/1`}>Read more</Link>
                </div>
              );
            })}
          </section>
        </main>
        <footer>
          <span onClick={changePage} className="left-page">
            {count}
          </span>
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
