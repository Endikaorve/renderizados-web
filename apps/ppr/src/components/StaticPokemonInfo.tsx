interface PokemonTypeInfo {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: PokemonTypeInfo[];
}

interface StaticPokemonInfoProps {
  pokemon: PokemonDetail;
}

export default function StaticPokemonInfo({ pokemon }: StaticPokemonInfoProps) {
  return (
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
        {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>
      <p className="static-note">
        <small>Esta información se prerenderizó estáticamente.</small>
      </p>
    </div>
  );
}
