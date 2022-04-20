import "../styles/Navigation.scss";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <h2>🛸 SWAPI Wiki</h2>
      <ul>
        <li>
          <a as={NavLink} end to="/films">
            Films
          </a>
        </li>
        <li>
          <a as={NavLink} end to="/people">
            People
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
