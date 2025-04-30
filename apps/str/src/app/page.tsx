import { Suspense } from "react";
import { PokemonSearch } from "./pokemon-search";

// Interfaz para la respuesta de la API y los Pokémon
interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonApiResponse {
  results: PokemonListItem[];
}

// Componente para mostrar el estado de carga del listado
function PokemonListSkeleton() {
  return (
    <div className="loading-container">
      <div className="loading-message">Cargando Pokémon...</div>
      <div className="loading-spinner"></div>
    </div>
  );
}

// Componente dinámico que fetchea y muestra la lista de Pokémon
async function PokemonList() {
  const pokemonList = await fetchPokemonList();

  return <PokemonSearch initialPokemon={pokemonList} />;
}

// Función asíncrona para obtener los datos
async function fetchPokemonList(): Promise<PokemonListItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
    {
      cache: "no-store", // Forzar fetch en cada request para que sea dinámico
    }
  );

  if (!response.ok) {
    throw new Error("Error al cargar los datos de Pokémon");
  }

  const data: PokemonApiResponse = await response.json();
  return data.results;
}

// Componente principal con SSR y streaming
export default function Page() {
  return (
    <div className="container">
      <h1>SSR: Server-Side Rendering con Streaming</h1>
      <p>
        Este título y descripción se generan en el servidor, mientras que el
        listado de Pokémon se carga de forma dinámica y se transmite usando
        streaming.
      </p>

      <div className="card">
        {/* El componente dinámico envuelto en Suspense para streaming */}
        <Suspense fallback={<PokemonListSkeleton />}>
          <PokemonList />
        </Suspense>
      </div>
    </div>
  );
}
