import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import header_icon from "./assets/icons/Header-red.png";
import pokeball from "./assets/icons/pokeball.png";
import "./Header.css";
import { typeIcons, typeDescriptions } from "./data";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchInput) {
      const pokemonName = searchInput.toLowerCase();
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        if (!response.ok) throw new Error("Pokémon not found");
        const data = await response.json();
        const page = Math.ceil(data.id / 12);
        navigate(`/page/${page}`);
        //  only works with double click -_-' needs research
        // Scroll to the Pokemon card
        const cardId = data.id;
        console.log("Card ID:", cardId);
        const cardElement = document.getElementById(`pokemon-card-${cardId}`);
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div>
      <div className="header">
        <img src={header_icon} alt="" className="header-image" />
      </div>
      <div className="searchbar-container">
        <div className="search">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="search"
              placeholder="Search your Pokemon..."
              className="search-input"
              value={searchInput}
              onChange={handleSearchChange}
            />
            <img
              src={pokeball}
              alt="search"
              className="pokeball-icon"
              onClick={handleSearchSubmit}
            />
          </form>
        </div>

        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            <i className="bi bi-sort-up-alt"></i>
          </button>
          <div
            id="myDropdown"
            className={`dropdown-content ${dropdownVisible ? "show" : ""}`}
          >
            <a href="#">
              <img className="grid-icon" src={typeIcons.fire} alt="fire Icon" />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.grass}
                alt="grass Icon"
              />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.steel}
                alt="steel Icon"
              />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.water}
                alt="water Icon"
              />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.psychic}
                alt="psychic Icon"
              />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.ground}
                alt="ground Icon"
              />
            </a>
            <a href="#">
              <img className="grid-icon" src={typeIcons.ice} alt="ice Icon" />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.flying}
                alt="flying Icon"
              />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.ghost}
                alt="ghost Icon"
              />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.normal}
                alt="normal Icon"
              />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.poison}
                alt="poison Icon"
              />
            </a>
            <a href="#">
              <img className="grid-icon" src={typeIcons.rock} alt="rock Icon" />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.fighting}
                alt="fighting Icon"
              />
            </a>
            <a href="#">
              <img className="grid-icon" src={typeIcons.dark} alt="dark Icon" />
            </a>
            <a href="#">
              <img className="grid-icon" src={typeIcons.bug} alt="bug Icon" />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.dragon}
                alt="dragon Icon"
              />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.electric}
                alt="electric Icon"
              />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.fairy}
                alt="fairy Icon"
              />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.unknown}
                alt="unknown Icon"
              />
            </a>
            <a href="#">
              <img
                className="grid-icon"
                src={typeIcons.shadow}
                alt="shadow Icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
// {Object.entries(typeIcons).map(([type, icon]) => (
//   <a href="#" key={type}>
//     <img className="grid-icon" src={icon} alt={`${type} Icon`} />
//   </a>
// ))}
