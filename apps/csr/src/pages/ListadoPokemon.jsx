import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "../App.css";

function ListadoPokemon() {
  const [busqueda, setBusqueda] = useState("");

  const {
    data: pokemonList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
      );
      if (!response.ok) {
        throw new Error("Error al cargar la lista de Pokémon");
      }
      const data = await response.json();
      return data.results;
    },
  });

  const pokemonFiltrados = pokemonList
    ? pokemonList.filter((pokemon) =>
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
              const pokemonId =
                pokemon.url.split("/")[pokemon.url.split("/").length - 2];
              return (
                <li key={pokemon.name} className="pokemon-item">
                  <Link to={`/detalles/${pokemon.name}`}>
                    <span className="pokemon-id">#{pokemonId}</span>
                    <span className="pokemon-name">{pokemon.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {!isLoading &&
          !isError &&
          pokemonFiltrados.length === 0 &&
          busqueda && (
            <p className="no-results">
              No se encontraron Pokémon con ese nombre.
            </p>
          )}
      </div>
    </div>
  );
}

export default ListadoPokemon;
