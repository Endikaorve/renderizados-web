"use client";

import { useState } from "react";
import Link from "next/link";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonSearchProps {
  initialPokemon: Pokemon[];
}

export default function PokemonSearch({ initialPokemon }: PokemonSearchProps) {
  const [busqueda, setBusqueda] = useState("");

  // Filtrado en cliente
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
        className="p-2 border rounded-md w-full max-w-md mb-4"
      />

      <ul className="space-y-2">
        {pokemonFiltrados.map((pokemon) => {
          const pokemonId =
            pokemon.url.split("/")[pokemon.url.split("/").length - 2];

          return (
            <li key={pokemon.name} className="hover:bg-gray-100 p-2 rounded">
              <Link href={`/detalles/${pokemon.name}`} className="block">
                #{pokemonId} - {pokemon.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
