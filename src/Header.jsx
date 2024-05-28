import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import header_icon from "./assets/icons/Header-red.png";
import pokeball from "./assets/icons/pokeball.png";
import "./Header.css";
import { typeIcons } from "./data";

const Header = ({ setSelectedType }) => {
  const [searchInput, setSearchInput] = useState("");
  const [showButton, setShowButton] = useState(false);
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
        const cardId = data.id;
        const cardElement = document.getElementById(`pokemon-card-${cardId}`);
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleClick = () => {
    window.location.reload();
  };

  const handleTypeIconClick = (type) => {
    setSelectedType(type);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="header">
        <img
          src={header_icon}
          alt=""
          className="header-image"
          onClick={handleClick}
        />
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
            {Object.entries(typeIcons).map(([type, icon]) => (
              <a href="#" key={type} onClick={() => handleTypeIconClick(type)}>
                <img className="grid-icon" src={icon} alt={`${type} Icon`} />
              </a>
            ))}
          </div>
        </div>
      </div>
      {showButton && (
        <button className="btn" onClick={scrollToTop} title="Go to top">
          <i class="bi bi-arrow-up-short"></i>
        </button>
      )}
    </div>
  );
};

export default Header;
