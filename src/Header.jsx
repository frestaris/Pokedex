import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import header_icon from "./assets/icons/Header-red.png";
import pokeball from "./assets/icons/pokeball.png";
import "./Header.css";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

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

        // Scroll to the Pokemon card
        const cardId = data.id;
        console.log("Card ID:", cardId);
        const cardElement = document.getElementById(`pokemon-card-${cardId}`);
        console.log("Card Element:", cardElement);
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="header-container">
      <div className="container">
        <img src={header_icon} alt="" className="header-image" />
      </div>
      <div className="searchbar-container">
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
    </div>
  );
};

export default Header;
