import Link from "next/link"

export default function Home() {
  return (
    <main>
      <div className="text-center p-8 space-x-4 ">
        <Link 
          href="/authors"
          className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 disabled:bg-gray-300"
        >
          Ver Autores
        </Link>
        <Link 
          href="/crear" 
          className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 disabled:bg-gray-300"
        >
          Crear Autores
        </Link>
      </div>
    </main>
  );
}
