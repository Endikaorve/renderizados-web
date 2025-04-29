import PokemonSearch from "@/components/PokemonSearch";
import { unstable_noStore as noStore } from "next/cache";

// Interfaz para la respuesta de la API y los Pokémon
interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonApiResponse {
  results: PokemonListItem[];
}

// Función para obtener contenido estático (prerenderizado)
async function fetchStaticContent() {
  // Este contenido se prerenderiza en el build
  return {
    title: "PPR: Partial Prerendering",
    description:
      "Combinación de contenido estático y dinámico en una sola página.",
  };
}

// Función para obtener contenido dinámico (en tiempo de ejecución)
async function fetchPokemonList(): Promise<PokemonListItem[]> {
  // Marcar esta parte como dinámica (no se prerenderiza)
  noStore();

  // Simular una carga lenta para demostrar PPR
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );

  if (!response.ok) {
    throw new Error("Error al cargar los datos de Pokémon");
  }

  const data: PokemonApiResponse = await response.json();
  return data.results;
}

export default async function Page() {
  // Esta parte se ejecuta durante la construcción (estática)
  const staticContent = await fetchStaticContent();

  // Esta parte se ejecuta en tiempo de solicitud (dinámica)
  let pokemonList: PokemonListItem[] = [];
  try {
    pokemonList = await fetchPokemonList();
  } catch (error) {
    console.error(error);
    return (
      <div className="container">
        <h1>{staticContent.title}</h1>
        <p>{staticContent.description}</p>
        <div className="card error">Error al cargar la lista de Pokémon.</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{staticContent.title}</h1>
      <p>{staticContent.description}</p>

      <p className="timestamp">
        Tiempo de carga dinámico: {new Date().toISOString()}
      </p>

      <div className="card">
        {/* Componente cliente para la búsqueda */}
        <PokemonSearch initialPokemon={pokemonList} />
      </div>
    </div>
  );
}
