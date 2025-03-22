import { Link } from "react-router-dom";
import logo_dark from "../images/logo_dark_n.png";
// import logo_light from "../images/logo_light.png";

const NavBar = () => {
  return (
    <nav
      id="nav-bar"
      className="flex justify-center items-center px-16 py-4 m-0 text-white fixed top-0 w-full z-50"
    >
      <div
        id="nav-container"
        className="flex justify-between items-center w-full"
      >
        <img src={logo_dark} alt="This is a logo" className="h-20" />
        <ul className="flex justify-around items-center w-1/3">
          <li className="text-3xl">
            <Link to="/">Home</Link>
          </li>
          <li className="text-3xl">
            <Link to="/movie">Movie</Link>
          </li>
          <li className="text-3xl">
            <Link to="/tv">TV</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
