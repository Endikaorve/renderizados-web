import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">¡Pokémon no encontrado!</h1>
      <p className="text-lg mb-8">
        Lo sentimos, no pudimos encontrar el Pokémon que estás buscando.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Volver al listado de Pokémon
      </Link>
    </div>
  );
}
