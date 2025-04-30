import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function DetallePokemon() {
  const { nombre } = useParams(); // Obtener nombre de la URL

  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemonDetail", nombre],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nombre}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Pokémon no encontrado");
        }
        throw new Error("Error al cargar los datos del Pokémon");
      }
      return response.json();
    },
    enabled: !!nombre, // Solo ejecutar si 'nombre' existe
    retry: 1, // Reintentar solo 1 vez en caso de error
  });

  if (isLoading) return <p>Cargando detalles...</p>;
  // Mostrar error específico si el Pokémon no se encontró (404)
  if (error?.message === "Pokémon no encontrado") {
    return (
      <div>
        <Link to="/">Volver al listado</Link>
        <h1>Pokémon no encontrado</h1>
        <p>No se pudo encontrar el Pokémon llamado "{nombre}".</p>
      </div>
    );
  }
  // Mostrar error genérico para otros fallos
  if (error) return <p>Error al cargar detalles: {error.message}</p>;
  if (!pokemon) return <p>Pokémon no encontrado.</p>; // Fallback por si acaso

  return (
    <div>
      <Link to="/">Volver al listado</Link>
      <h1>Detalles de: {pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      <p>Altura: {pokemon.height / 10} m</p>
      <p>Peso: {pokemon.weight / 10} kg</p>
      <p>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
    </div>
  );
}

export default DetallePokemon;
