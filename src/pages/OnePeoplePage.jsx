import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SWApi from "../services/SWApi";
import "../styles/OnePeoplePage.scss";
import extractFromUrl, { Url } from "extract-from-url";

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
            <div className="people-container">
              {person.films.map((characterURL) => {
                const urlParts = extractFromUrl(characterURL);
                const { path } = extractFromUrl(characterURL);
                let uniquePath = path.substring(
                  path.indexOf("/") + 11,
                  path.lastIndexOf("/")
                );
                console.log(uniquePath);
                return (
                  <div className="people-styling" key={characterURL}>
                    <Link to={`/films/${uniquePath}`}>
                      Movies: {uniquePath}
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

export default Person;
