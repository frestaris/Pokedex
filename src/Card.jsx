import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { typeColors, typeIcons } from "./data.js";
import "./Card.css";

const Card = () => {
  const { page, search } = useParams();
  const navigate = useNavigate();
  const currentPage = parseInt(page, 10) || 1;

  const [pokemonData, setPokemonData] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [pokemonPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadPokemons();
  }, [currentPage]);

  useEffect(() => {
    fetchAllPokemonData();
  }, []);

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        if (!response.ok) throw new Error("Failed to fetch Pokémon data");
        const data = await response.json();
        const totalPokemon = data.count;
        const calculatedTotalPages = Math.ceil(totalPokemon / pokemonPerPage);
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTotalPages();
  }, [pokemonPerPage]);

  useEffect(() => {
    window.scrollTo(0, 300);
  }, [currentPage]);

  useEffect(() => {
    if (search) {
      const pokemon = allPokemonData.find(
        (p) => p.name === search.toLowerCase()
      );
      if (pokemon) {
        const page = Math.ceil(pokemon.id / pokemonPerPage);
        navigate(`/page/${page}`);
      }
    }
  }, [search, allPokemonData, navigate, pokemonPerPage]);

  const fetchAllPokemonData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10000"
      );
      if (!response.ok) throw new Error("Failed to fetch all Pokémon data");
      const data = await response.json();
      setAllPokemonData(data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loadPokemons = async () => {
    try {
      const data = [];
      const startIndex = (currentPage - 1) * pokemonPerPage + 1;
      const endIndex = currentPage * pokemonPerPage;
      for (let id = startIndex; id <= endIndex; id++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("Failed to fetch Pokémon data");
        const pokemon = await response.json();
        data.push(pokemon);
      }
      setPokemonData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePageChange = (page) => {
    navigate(`/page/${page}`);
  };

  const renderPokemonCards = () => {
    return (
      <div id="pokemon-container" className="row justify-content-center gap-5">
        {pokemonData.map((pokemon) => {
          const type = pokemon.types[0].type.name;
          return (
            <div
              key={`pokemon-card-${pokemon.id}`}
              id={`pokemon-card-${pokemon.id}`}
              className="card mb-3"
              style={{
                maxWidth: "25rem",
                backgroundColor: typeColors[type],
              }}
            >
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                className="card-img-top mt-2"
                alt={pokemon.name}
              />
              <div className="card-body">
                <h5 className="card-title mb-5">{`#${pokemon.id} ${
                  pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                }`}</h5>
                <p className="card-text">
                  <strong>Type:</strong>{" "}
                  {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                  <img src={typeIcons[type]} alt={type} className="type-icon" />
                </p>
                <p className="card-text">
                  <strong>Abilities:</strong>{" "}
                  {pokemon.abilities
                    .map(
                      (ability) =>
                        ability.ability.name.charAt(0).toUpperCase() +
                        ability.ability.name.slice(1)
                    )
                    .join(", ")}
                </p>
                <p className="card-text">
                  <strong>Weight:</strong> {pokemon.weight} Kg
                </p>
                <p className="card-text">
                  <strong>Height:</strong> {pokemon.height} M
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    return (
      <nav aria-label="...">
        <ul className="pagination-container pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {pages}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div>
      {renderPokemonCards()}
      {totalPages > 0 && renderPagination()}
    </div>
  );
};

export default Card;
