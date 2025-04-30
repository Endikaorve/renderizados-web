import { PokemonSearch } from "./pokemon-search";

// Interfaz para la respuesta de la API y los Pokémon
interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonApiResponse {
  results: PokemonListItem[];
}

// Componente servidor para mostrar el estado de carga
// function LoadingPokemon() { ... } // Podemos quitarlo si no usamos Suspense aquí

// Función asíncrona para obtener los datos
async function fetchPokemonList(): Promise<PokemonListItem[]> {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    // En un Server Component, es mejor lanzar un error que devolver JSX
    // Next.js lo capturará y mostrará la página de error más cercana (error.tsx)
    throw new Error("Error al cargar los datos de Pokémon");
  }

  const data: PokemonApiResponse = await response.json();
  return data.results;
}

// Componente servidor - se ejecuta siempre en el servidor
export default async function Page() {
  // Fetch desde el servidor
  // Manejar el error aquí o dejar que Next.js lo haga con un error.tsx
  let pokemonList: PokemonListItem[] = [];
  try {
    pokemonList = await fetchPokemonList();
  } catch (error) {
    console.error(error);
    // Podríamos mostrar un estado de error aquí, o confiar en error.tsx
    return (
      <div className="container">
        <h1>RSC: React Server Components</h1>
        <p>Error al cargar la lista inicial de Pokémon.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>RSC: React Server Components</h1>
      <p>
        El listado inicial se carga en el servidor. El buscador es un componente
        cliente interactivo.
      </p>

      <div className="card">
        {/* Pasamos la lista inicial al componente cliente */}
        <PokemonSearch initialPokemon={pokemonList} />
        {/* Suspense ya no es necesario aquí si el fetch es bloqueante */}
      </div>
    </div>
  );
}
