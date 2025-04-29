import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Habilitar PPR para esta ruta
export const experimental_ppr = true;

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

// Componente para el esqueleto de carga de los datos del Pokémon
function PokemonDetailSkeleton() {
  return (
    <div className="loading-container">
      <div className="loading-message">Cargando detalles...</div>
      <div className="loading-spinner"></div>
    </div>
  );
}

// Componente dinámico para los detalles del Pokémon
async function PokemonDetails({ nombre }: { nombre: string }) {
  const pokemon = await fetchPokemonDetail(nombre);

  // Si no se encuentra el Pokémon, mostrar página 404
  if (!pokemon) {
    notFound();
  }

  return (
    <div>
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
  );
}

async function fetchPokemonDetail(
  nombre: string
): Promise<PokemonDetail | null> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nombre}`,
      {
        cache: "no-store", // Forzar fetch en cada request para que sea dinámico
      }
    );
    if (!response.ok) {
      return null;
    }
    const pokemon: PokemonDetail = await response.json();
    return pokemon;
  } catch (error) {
    console.error("Error fetching Pokémon detail:", error);
    return null;
  }
}

export default async function DetallePokemonPage({ params }: PageProps) {
  const { nombre } = await params;

  return (
    <div className="container">
      <div className="card">
        {/* Esto estará prerenderizado */}
        <Link href="/">Volver al listado</Link>
        <h1>Detalles (PPR): {nombre}</h1>

        {/* Esto se renderizará dinámicamente */}
        <Suspense fallback={<PokemonDetailSkeleton />}>
          <PokemonDetails nombre={nombre} />
        </Suspense>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { nombre } = await params;

  return {
    title: `Detalles de ${nombre} - PPR`,
  };
}
