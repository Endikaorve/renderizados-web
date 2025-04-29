import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./App.css";

function ListadoPokemon() {
  const [busqueda, setBusqueda] = useState("");

  // Carga de datos en el cliente
  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
      );
      if (!response.ok) {
        throw new Error("Error al cargar los datos de Pokémon");
      }
      const data = await response.json();
      return data.results;
    },
  });

  // Filtrado en el cliente
  const pokemonFiltrados = pokemon
    ? pokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
      )
    : [];

  return (
    <div className="container">
      <h1>CSR: Client-Side Rendering</h1>
      <p>Los datos se cargan y filtran completamente en el cliente.</p>

      <div className="card">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar Pokémon..."
          className="search-input"
        />

        {isLoading && (
          <div className="loading-container">
            <div className="loading-message">Cargando...</div>
            <div className="loading-spinner"></div>
          </div>
        )}

        {isError && <div className="error">Error: {error.message}</div>}

        {!isLoading && !isError && (
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

        {!isLoading && !isError && pokemonFiltrados.length === 0 && (
          <p className="no-results">No se encontraron Pokémon con ese nombre</p>
        )}
      </div>
    </div>
  );
}

export default ListadoPokemon;
