import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SWApi from "../services/SWApi";
import "../styles/FilmPage.scss";

const Person = () => {
  let { id } = useParams();
  const [person, setPerson] = useState("");

  const fetchPerson = async () => {
    console.log("här är id", id);
    const data = await SWApi.getSinglePerson(id);
    console.log(data);
    setPerson(data);
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  return (
    <>
      <section>
        {person && (
          <>
            <div className="main-container">
              <h2>{person.name}</h2>
              <p>Eye color: {person.eye_color}</p>
              <p>Gender: {person.gender}</p>
              <p>Hair color: {person.hair_color}</p>
              <p>Height: {person.height}</p>
              <p>Homeworld: {person.homeworld}</p>
            </div>
            <div className="character-container">
              {/* {person.films.map((filmURL) => {
                //   const characterId = getIdFromUrl(characterURL);
                console.log(filmURL);
                return (
                  <div className="character-styling" key={filmURL}>
                    <Link to={`/people/${filmURL}`}>Film links</Link>
                  </div>
                );
              })} */}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Person;
