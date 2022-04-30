import React from "react";
import "../styles/Navigation.scss";
import { Link } from "react-router-dom";
import swlogo from "../images/swlogo.svg";

const Navigation = () => {
  return (
    <nav>
      <Link to="/">🛸 SWAPI Wiki</Link>
      <img src={swlogo} />
      <ul>
        <Link to="/films">Films</Link>
        <Link to="/people">People</Link>
      </ul>
    </nav>
  );
};

export default Navigation;
