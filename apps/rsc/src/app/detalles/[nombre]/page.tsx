import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

// Definir interfaces para los datos del Pokémon
interface PokemonTypeInfo {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonSprites {
  front_default: string;
}

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonTypeInfo[];
}

interface PageProps {
  params: Promise<{ nombre: string }>;
}

async function fetchPokemonDetail(
  nombre: string
): Promise<PokemonDetail | null> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nombre}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      // Si la respuesta no es OK (ej. 404), devolvemos null
      return null;
    }
    const pokemon: PokemonDetail = await response.json();
    return pokemon;
  } catch (error) {
    console.error("Error fetching Pokémon detail:", error);
    // Si hay un error en el fetch (red, etc.), también devolvemos null
    return null;
  }
}

export default async function DetallePokemonPage({ params }: PageProps) {
  const { nombre } = await params;
  const pokemon = await fetchPokemonDetail(nombre);

  // Si fetchPokemonDetail devolvió null (no encontrado o error),
  // usamos notFound() para renderizar la página 404 más cercana.
  if (!pokemon) {
    notFound();
  }

  return (
    <div className="container">
      {" "}
      {/* Reutilizar clases si aplican */}
      <div className="card">
        {" "}
        {/* Reutilizar clases si aplican */}
        <Link href="/">Volver al listado</Link>
        <h1>Detalles (RSC): {pokemon.name}</h1>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={96}
          height={96}
          priority
        />
        <p>ID: {pokemon.id}</p>
        <p>Altura: {pokemon.height / 10} m</p>
        <p>Peso: {pokemon.weight / 10} kg</p>
        <p>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { nombre } = await params;

  return {
    title: `Detalles de ${nombre}`,
  };
}
