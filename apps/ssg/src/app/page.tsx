import PokemonSearch from "@/components/PokemonSearch";

// Datos generados estáticamente durante el build
export async function generateStaticParams() {
  return [];
}

async function getData() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
    { cache: "force-cache" } // force-cache es el equivalente al comportamiento de SSG en App Router
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
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
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">SSG: Static Site Generation</h1>
      <p className="mb-8">
        Página generada durante el build. Generada el: {generadoEn}
      </p>

      <div className="w-full max-w-2xl">
        {/* Componente cliente para la búsqueda */}
        <PokemonSearch initialPokemon={pokemon} />
      </div>
    </main>
  );
}
