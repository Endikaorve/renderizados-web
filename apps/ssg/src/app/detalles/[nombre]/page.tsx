import Link from "next/link";
import { notFound } from "next/navigation";

// Define qué rutas se pre-renderizarán en el build
export async function generateStaticParams() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
    { cache: "force-cache" }
  );
  const data = await res.json();

  return data.results.map((pokemon: { name: string }) => ({
    nombre: pokemon.name,
  }));
}

// Obtiene datos para una página específica durante el build
async function getPokemonData(nombre: string) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`, {
      cache: "force-cache",
      next: { revalidate: 60 }, // Opcional: revalidar cada 60s
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

interface PokemonPageProps {
  params: {
    nombre: string;
  };
}

interface PokemonType {
  type: {
    name: string;
  };
}

export default async function DetallePokemon({ params }: PokemonPageProps) {
  const { nombre } = params;
  const pokemon = await getPokemonData(nombre);
  const generadoEn = new Date().toISOString();

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center p-8 max-w-2xl mx-auto">
      <Link href="/" className="self-start mb-4 text-blue-500 hover:underline">
        Volver al listado
      </Link>

      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Detalles (SSG): {pokemon.name}
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32"
          />
        </div>

        <div className="space-y-2">
          <p className="text-lg">
            <span className="font-bold">ID:</span> {pokemon.id}
          </p>
          <p className="text-lg">
            <span className="font-bold">Altura:</span> {pokemon.height / 10} m
          </p>
          <p className="text-lg">
            <span className="font-bold">Peso:</span> {pokemon.weight / 10} kg
          </p>
          <p className="text-lg">
            <span className="font-bold">Tipos:</span>{" "}
            {pokemon.types.map((t: PokemonType) => t.type.name).join(", ")}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            <small>Página generada/revalidada el: {generadoEn}</small>
          </p>
        </div>
      </div>
    </div>
  );
}
