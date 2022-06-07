import "../styles/PeoplePage.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import SWApi from "../services/SWApi";
import extractFromUrl, { Url } from "extract-from-url";

const PeoplePage = () => {
  const [count, setCount] = useState(1);
  const [people, setPeople] = useState("");
  const [loadingData, setLoadingDataStatus] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState("");
  const [buttonValue, setButtonValue] = useState("");
  const page = parseInt(searchParams.get("page") ?? 1);

  const fetchPeople = async () => {
    const data = await SWApi.nextPagePeople(page);
    const calculatePages = data.count / 10;
    console.log("Hej här är datan: ", data);
    setPeople("");
    setPeople(data.results);
    setLoadingDataStatus(false);
    setPages(Math.ceil(calculatePages));
  };

  useEffect(() => {
    fetchPeople(page);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (buttonValue === "next") {
      fetchPeople(page);
    }
    if (buttonValue === "previous") {
      fetchPeople(page);
    }
    setButtonValue("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, buttonValue, people]);

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
          <section>
            {people.map((character) => {
              // const urlParts = extractFromUrl(character.url);
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
          <button
            onClick={() => {
              setSearchParams({ page: page - 1 });
              setButtonValue("previous");
            }}
            disabled={page === 1}
            className="left-page"
          >
            left
          </button>
          <span>
            {page} / {pages}
          </span>
          <button
            onClick={() => {
              setSearchParams({ page: page + 1 });
              setButtonValue("next");
            }}
            className="right-page"
            disabled={page === 9}
          >
            right
          </button>
        </footer>
      </>
    );
  }

  console.log(people);
};

export default PeoplePage;
