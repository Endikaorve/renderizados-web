import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import StaticPokemonInfo from "@/components/StaticPokemonInfo";

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

interface PokemonDynamicStats {
  lastViewed: string;
  popularityRank: number | string;
  randomFact: string;
}

// Define qué rutas se pre-renderizarán en el build
export async function generateStaticParams() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  const data = await res.json();

  // Solo prerenderizar los primeros 20 para demostración
  return data.results.slice(0, 20).map((pokemon: { name: string }) => ({
    nombre: pokemon.name,
  }));
}

// Función para obtener datos estáticos (prerenderizados)
async function getStaticPokemonData(
  nombre: string
): Promise<PokemonDetail | null> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Función para obtener datos dinámicos (en tiempo de ejecución)
async function getDynamicPokemonStats(
  nombre: string
): Promise<PokemonDynamicStats> {
  // Marcar esta parte como dinámica
  noStore();

  // Simular una carga lenta para demostrar PPR
  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    // En una aplicación real, esto podría ser una llamada a otra API
    // o a una base de datos para obtener estadísticas actualizadas
    return {
      lastViewed: new Date().toISOString(),
      popularityRank: Math.floor(Math.random() * 151) + 1,
      randomFact: `Dato curioso generado dinámicamente para ${nombre}`,
    };
  } catch (err) {
    console.error(err);
    return {
      lastViewed: new Date().toISOString(),
      popularityRank: "N/A",
      randomFact: "No se pudieron cargar datos dinámicos",
    };
  }
}

export default async function DetallePokemonPage({
  params,
}: {
  params: { nombre: string };
}) {
  const { nombre } = params;

  // Datos estáticos (prerenderizados)
  const pokemon = await getStaticPokemonData(nombre);

  if (!pokemon) {
    notFound();
  }

  // Datos dinámicos (cargados en tiempo de ejecución)
  const dynamicStats = await getDynamicPokemonStats(nombre);

  return (
    <div className="container">
      <Link href="/" className="back-link">
        Volver al listado
      </Link>

      {/* Sección estática prerenderizada */}
      <div className="card static-section">
        <h1>Detalles (PPR): {pokemon.name}</h1>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={150}
          height={150}
          priority
        />
        <StaticPokemonInfo pokemon={pokemon} />
      </div>

      {/* Sección dinámica cargada en tiempo de ejecución */}
      <div className="card dynamic-section">
        <h2>Estadísticas en vivo</h2>
        <p>
          <strong>Última visualización:</strong> {dynamicStats.lastViewed}
        </p>
        <p>
          <strong>Ranking de popularidad:</strong> #
          {dynamicStats.popularityRank}
        </p>
        <p>
          <strong>Dato curioso:</strong> {dynamicStats.randomFact}
        </p>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { nombre: string };
}) {
  return {
    title: `Detalles de ${params.nombre} - PPR Demo`,
  };
}
