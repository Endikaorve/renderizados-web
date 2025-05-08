import PokemonSearch from '@/components/PokemonSearch';

// Datos generados estáticamente durante el build
export async function generateStaticParams() {
  return [];
}

async function getData() {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0',
    {
      next: { revalidate: 60 }, // Revalidación cada 60 segundos (1 minuto)
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return {
    pokemon: data.results,
    generadoEn: new Date().toISOString(),
  };
}

export default async function Home() {
  const { pokemon, generadoEn } = await getData();

  return (
    <div className="container">
      <h1>ISR: Incremental Static Regeneration</h1>
      <p>
        Página generada durante el build. Revalidada cada minuto.
        Generada/revalidada el: {generadoEn}
      </p>

      {/* Componente cliente para la búsqueda */}
      <PokemonSearch initialPokemon={pokemon} />
    </div>
  );
}
