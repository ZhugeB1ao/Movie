import { Link } from "react-router-dom";
import { useState } from "react";
import logo_dark from "../assets/images/logo_dark.png";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      id="nav-bar"
      className="flex justify-between items-center m-0 text-white fixed top-0 w-full z-40 transition-all duration-300 bg-black 
                px-4 md:px-8 lg:px-16"
    >
      <img
        src={logo_dark}
        alt="This is a logo"
        className="h-12 md:h-16 lg:h-20"
      />
      <button
        className="md:hidden 
                  text-2xl lg:text-3xl "
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      <ul
        className={`${isMenuOpen ? "flex" : "hidden"} items-center left-0  
          flex-col md:flex md:flex-row  
          justify-center md:justify-around
          absolute md:static
          top-12 md:top-0
          w-full md:w-1/2 lg:w-1/3  
          space-y-2 md:space-y-0 md:space-x-4
          bg-black md:bg-transparent`}
      >
        <li className="text-lg md:text-xl lg:text-2xl">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li className="text-lg md:text-xl lg:text-2xl">
          <Link to="/Movies" onClick={() => setIsMenuOpen(false)}>
            Movies
          </Link>
        </li>
        <li className="text-lg md:text-xl lg:text-2xl">
          <Link to="/TVSeries" onClick={() => setIsMenuOpen(false)}>
            TV Series
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
