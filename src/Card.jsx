import React, { useState, useEffect } from "react";
import { typeColors, typeIcons } from "./data.js";
import "./Card.css";

const Card = ({ selectedType }) => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    loadPokemons();
  }, [selectedType]);

  const loadPokemons = async () => {
    try {
      const data = [];
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=150"
      );
      if (!response.ok) throw new Error("Failed to fetch Pokémon data");
      const { results } = await response.json();

      for (const pokemon of results) {
        const pokemonResponse = await fetch(pokemon.url);
        if (!pokemonResponse.ok)
          throw new Error("Failed to fetch Pokémon data");
        const pokemonDetails = await pokemonResponse.json();

        if (
          !selectedType ||
          pokemonDetails.types.some((type) => type.type.name === selectedType)
        ) {
          data.push(pokemonDetails);
        }
      }

      setPokemonData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderPokemonCards = () => {
    return (
      <div id="pokemon-container" className="row justify-content-center gap-5">
        {pokemonData.map((pokemon) => (
          <div
            key={`pokemon-card-${pokemon.id}`}
            id={`pokemon-card-${pokemon.id}`}
            className="card mb-3"
            style={{
              maxWidth: "25rem",
              backgroundColor: typeColors[pokemon.types[0].type.name],
            }}
          >
            <div className="card-header">
              <h5>{`#${pokemon.id} ${pokemon.name}`}</h5>
              <div className="card-title-right">
                <p>
                  <img
                    src={typeIcons[pokemon.types[0].type.name]}
                    alt={pokemon.types[0].type.name}
                    className="type-icon"
                  />
                </p>
                <p>{pokemon.stats[0].base_stat} HP</p>
              </div>
            </div>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              className="card-img-top mt-2"
              alt={pokemon.name}
            />
            <div className="card-body">
              <div className="card-text">
                <strong>Type:</strong>{" "}
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </div>
              <div className="card-text">
                <strong>Weight:</strong> {pokemon.weight} Kg
              </div>
              <div className="card-text">
                <strong>Height:</strong> {pokemon.height} M
              </div>
              <div className="card-text">
                <strong>Abilities:</strong>{" "}
                {pokemon.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return <div>{renderPokemonCards()}</div>;
};

export default Card;
