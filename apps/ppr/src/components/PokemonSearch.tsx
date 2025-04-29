"use client";

import { useState } from "react";
import Link from "next/link";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonSearchProps {
  initialPokemon: PokemonListItem[];
}

export default function PokemonSearch({ initialPokemon }: PokemonSearchProps) {
  const [busqueda, setBusqueda] = useState("");

  const pokemonFiltrados = initialPokemon.filter((pokemon) =>
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

      {pokemonFiltrados.length === 0 && busqueda ? (
        <p className="no-results">No se encontraron Pokémon con ese nombre.</p>
      ) : (
        <ul className="pokemon-list">
          {pokemonFiltrados.map((pokemon) => {
            const pokemonId =
              pokemon.url.split("/")[pokemon.url.split("/").length - 2];
            return (
              <li key={pokemon.name} className="pokemon-item">
                <Link href={`/detalles/${pokemon.name}`}>
                  <span className="pokemon-id">#{pokemonId}</span>
                  <span className="pokemon-name">{pokemon.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
