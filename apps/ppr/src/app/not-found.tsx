import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="card error">
        <h1>¡Pokémon no encontrado!</h1>
        <p>Lo sentimos, no pudimos encontrar el Pokémon que estás buscando.</p>
        <Link href="/" className="back-link">
          Volver al listado de Pokémon
        </Link>
      </div>
    </div>
  );
}
