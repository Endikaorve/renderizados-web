"use client";

import { useState } from "react";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonSearchProps {
  pokemon: Pokemon[];
}

export function PokemonSearch({ pokemon }: PokemonSearchProps) {
  const [busqueda, setBusqueda] = useState("");

  const pokemonFiltrados = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar Pokémon..."
        className="search-input"
      />

      {pokemonFiltrados.length === 0 ? (
        <p className="no-results">No se encontraron Pokémon con ese nombre</p>
      ) : (
        <ul className="pokemon-list">
          {pokemonFiltrados.map((pokemon) => {
            // Extraer el ID del Pokémon de la URL
            const pokemonId =
              pokemon.url.split("/")[pokemon.url.split("/").length - 2];

            return (
              <li key={pokemon.name} className="pokemon-item">
                <span className="pokemon-id">#{pokemonId}</span>
                <span className="pokemon-name">{pokemon.name}</span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
