import { Suspense } from 'react';
import { PokemonSearch } from './pokemon-search';

// Habilitar PPR para esta ruta
export const experimental_ppr = true;

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
  await new Promise(resolve => setTimeout(resolve, 5000));

  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0',
    {
      cache: 'no-store', // Forzar fetch en cada request para que sea dinámico
    },
  );

  if (!response.ok) {
    throw new Error('Error al cargar los datos de Pokémon');
  }

  const data: PokemonApiResponse = await response.json();
  return data.results;
}

// Componente principal - usa PPR
export default function Page() {
  return (
    <div className="container">
      <h1>PPR: Partial Prerendering</h1>
      <p>
        Este título y descripción están prerenderizados, mientras que el listado
        de Pokémon se carga dinámicamente usando Partial Prerendering.
      </p>

      <div className="card">
        {/* El componente dinámico envuelto en Suspense */}
        <Suspense fallback={<PokemonListSkeleton />}>
          <PokemonList />
        </Suspense>
      </div>
    </div>
  );
}
