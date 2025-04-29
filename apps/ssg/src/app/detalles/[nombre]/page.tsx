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
    <div className="container">
      <div className="card">
        <Link href="/" className="back-link">
          Volver al listado
        </Link>
        <h1>Detalles (SSG): {pokemon.name}</h1>
        <div className="pokemon-detail">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-image"
          />
          <div className="pokemon-info">
            <p>
              <strong>ID:</strong> {pokemon.id}
            </p>
            <p>
              <strong>Altura:</strong> {pokemon.height / 10} m
            </p>
            <p>
              <strong>Peso:</strong> {pokemon.weight / 10} kg
            </p>
            <p>
              <strong>Tipos:</strong>{" "}
              {pokemon.types.map((t: PokemonType) => t.type.name).join(", ")}
            </p>
            <p className="generation-time">
              <small>Página generada/revalidada el: {generadoEn}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
