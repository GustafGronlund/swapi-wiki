import "../styles/HomePage.scss";
import { Link } from "react-router-dom";
import yoda from "../images/babyyoda.svg";

const HomePage = () => {
  return (
    <>
      <section>
        <div className="character-hero">
          <img src={yoda} />
        </div>
        <div className="info-box">
          <p>
            Hello!
            <br></br>
            This is an project created with React.
            <br></br>
            You can click on the menu to find more information about the people
            and the films they've starred in.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
