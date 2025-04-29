import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Definir tipos
interface PokemonType {
  type: {
    name: string;
  };
}

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

export default async function Page({
  params,
}: {
  params: Promise<{ nombre: string }>;
}) {
  // Esperar a que los parámetros estén disponibles
  const resolvedParams = await params;
  const nombre = resolvedParams.nombre;
  let pokemon;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`, {
      cache: "force-cache",
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      notFound();
    }

    pokemon = await res.json();
  } catch (err) {
    console.error(err);
    notFound();
  }

  const generadoEn = new Date().toISOString();

  return (
    <div className="container">
      <div className="card">
        <Link href="/" className="back-link">
          Volver al listado
        </Link>
        <h1>Detalles (SSG): {pokemon.name}</h1>
        <div className="pokemon-detail">
          <div className="pokemon-image-container">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-image"
              width={150}
              height={150}
              priority
            />
          </div>
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
