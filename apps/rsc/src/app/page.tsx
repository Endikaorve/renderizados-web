import { PokemonSearch } from "./pokemon-search";
import { Suspense } from "react";

// Componente servidor para mostrar el estado de carga
function LoadingPokemon() {
  return (
    <div className="loading-container">
      <div className="loading-message">Cargando...</div>
      <div className="loading-spinner"></div>
    </div>
  );
}

// Componente servidor - se ejecuta siempre en el servidor
export default async function Page() {
  // Fetch desde el servidor
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
    {
      cache: "no-store", // No cachear la respuesta para demostrar cada carga
    }
  );

  if (!response.ok) {
    return (
      <div className="container">
        <h1>RSC: React Server Components</h1>
        <p>
          El listado es un componente servidor, el buscador es un componente
          cliente.
        </p>
        <div className="card">
          <div className="error">
            Error: No se pudieron cargar los datos de Pokémon
          </div>
        </div>
      </div>
    );
  }

  const data = await response.json();

  return (
    <div className="container">
      <h1>RSC: React Server Components</h1>
      <p>
        El listado es un componente servidor, el buscador es un componente
        cliente.
      </p>

      <div className="card">
        {/* Componente cliente para la búsqueda */}
        <Suspense fallback={<LoadingPokemon />}>
          <PokemonSearch pokemon={data.results} />
        </Suspense>
      </div>
    </div>
  );
}
